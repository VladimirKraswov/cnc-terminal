import { createContext, useCallback, useContext, useState, useMemo, FC, useEffect, useRef } from 'react';

import { UnlistenFn, listen } from "@tauri-apps/api/event";

import { getEnding, handleConnect, handleGetPorts, handleSend } from '../../utils/serial';
import { REFRESH_PORTS_INTERVAL } from '../../constants';

const wait = (time: number) => new Promise((res) => {
  setTimeout(() => res(true), time)
})

interface IPortParameters {
  port: string
  baud: string 
  ending: string
}
interface ISerialContext {
  isConnected: boolean
  ports: string[]
  portResponse: string
  getPorts: () => string[]
  connect: (port: string, baud: string, ending: string) => boolean
  disconnect: () => void
  send: (command: string) => void
  clear: () => void
  run: (gcode: string) => void
}

type Payload = {
  message: string;
};

type SerialEvent = {
  payload: Payload;
};

const SerialContext = createContext<ISerialContext | undefined>(undefined);

const SerialProvider: FC<any> = ({ children }) => {
  const [ports, setPorts] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false)
  const [portResponse, setPortResponse] = useState<string>('');
  const updateSerialListener = useRef<UnlistenFn | null>(null);
  const [currentPortParameters, setCurrentPortParameters] = useState<IPortParameters | null>(null)

  const startSerialEventListener = useCallback(async () => {
    updateSerialListener?.current?.();
    setPortResponse('')
    await listen<Payload>("updateSerial", (event: SerialEvent) => {
      setPortResponse(event.payload.message)
    });
  }, []);

  const getPorts =  useCallback(async () => {
    const p = await handleGetPorts()
    setPorts(p.toString().split(','));
  }, [])

  const connect = useCallback(async (port: string, baud = '115200', ending = getEnding()[1]) => {
    try {
      const res = await handleConnect(port, baud, ending)
      setIsConnected(res);
      if(res) {
        await startSerialEventListener();
        setCurrentPortParameters({port, baud, ending});
        return true
      }
      return false
    } catch (error) {
      setIsConnected(false);
      setCurrentPortParameters(null);
      return false
    }
  }, [startSerialEventListener])

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setCurrentPortParameters(null);
    updateSerialListener?.current?.();
  }, [])

  const send = useCallback((cmd: string) => {
    handleSend(cmd);
  }, []);

  const clear = useCallback(() => {
    setPortResponse('')
  }, []);

  const run = useCallback(async (gcode: string) => {
    const lines = gcode.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (portResponse === 'ok' || portResponse === '') {
        send(lines[i])
        await wait(2000);
      }
    }
  }, [portResponse, send])

  const value = useMemo(
    () => ({
      isConnected,
      ports,
      portResponse,
      getPorts,
      connect,
      disconnect,
      send,
      clear,
      run,
    }),
    [isConnected, ports, portResponse, getPorts, connect, disconnect, send, clear, run],
  );

  useEffect(() => {
    getPorts();
    setInterval(() => {
      getPorts();
    }, REFRESH_PORTS_INTERVAL)
    /* eslint-disable-next-line */
  }, [])

  useEffect(() => {
    if(!ports.find((p) => p === currentPortParameters?.port)) {
      disconnect();
    }
    // es-lind-disabled-next-line
  }, [ports])

  return (
    /* @ts-ignore */
    <SerialContext.Provider value={value}>
      {children}
    </SerialContext.Provider>
  );
};

const useSerial = () => {
  const context = useContext(SerialContext);
  if (context === undefined) {
    throw new Error('useSerial must be used within a Provider');
  }
  return context;
};

export { SerialContext, SerialProvider, useSerial };
