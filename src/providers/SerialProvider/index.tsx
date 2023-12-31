import { createContext, useCallback, useContext, useState, useMemo, type FC, useEffect, useRef } from 'react'
import { type UnlistenFn, listen } from '@tauri-apps/api/event'

import { getEnding, handleConnect, handleGetPorts, handleSend } from './utils/serial'

import { wait } from './utils/wait'
import { GRBL_BUFFER_SIZE, REFRESH_PORTS_INTERVAL, MachineStates, JobStates, SerialBaud, ListenerEvents } from './constants'
import { type IPortParameters, type ISerialContext, type Payload, type SerialEvent } from './types'
import { isState } from './utils'

const SerialContext = createContext<ISerialContext | undefined>(undefined)

const SerialProvider: FC<any> = ({ children }): any => {
  const [ports, setPorts] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [portResponse, setPortResponse] = useState<string>('')
  const unlistenFnRef = useRef<UnlistenFn | null>(null)
  const [currentPortParameters, setCurrentPortParameters] = useState<IPortParameters | null>(null)
  const portResponseRef = useRef('')

  const startSerialEventListener = useCallback(async () => {
    return await listen<Payload>(ListenerEvents.UpdateSerial, (event: SerialEvent) => {
      portResponseRef.current = `${portResponseRef.current}${event.payload.message}`
      setPortResponse(event.payload.message)
    })
  }, [])

  const getSerialPorts = useCallback(async () => {
    const ports = await handleGetPorts()
    setPorts(ports.toString().split(','))
  }, [])

  const connect = useCallback(async (port: string, baud = SerialBaud.Default, ending = getEnding()[1]) => {
    try {
      const res = await handleConnect(port, baud, ending)
      setIsConnected(res)
      if (res) {
        unlistenFnRef?.current?.()
        unlistenFnRef.current = await startSerialEventListener()
        setCurrentPortParameters({ port, baud, ending })
        return true
      }
      return false
    } catch (error) {
      setIsConnected(false)
      setCurrentPortParameters(null)
      return false
    }
  }, [startSerialEventListener])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setCurrentPortParameters(null)
    unlistenFnRef?.current?.()
  }, [])

  const gcodeSend = useCallback(async (cmd: string): Promise<string> => {
    portResponseRef.current = ''
    await handleSend(cmd)
    await wait(10)
    return portResponseRef.current
  }, [])

  const clearPortResponse = useCallback(() => {
    portResponseRef.current = ''
  }, [])

  const waitForIdle = useCallback(async (): Promise<void> => {
    while (true) {
      if (!isConnected) {
        break
      }
      const status = await gcodeSend('?')
      if (isState(status, MachineStates.Idle)) {
        return
      }
      await wait(100)
    }
  }, [isConnected, gcodeSend])

  // Отправить буфер с gcode на выполнение
  const sendBuffer = async (buffer: string[]): Promise<void> => {
    for (let i = 0; i < buffer.length; i++) {
      if (!isConnected) {
        return
      }
      const bufferLine = buffer[i]
      const res = await gcodeSend(bufferLine)
      if (isState(res, JobStates.Error)) {
        return
      }
    }
  }

  // Запустить выполнение gcode
  const gcodeRunExecution = useCallback(async (gcode: string) => {
    const lines = gcode.split('\n')
    const buffer: string[] = []

    // проходим по всему gcode
    for (let i = 0; i < lines.length; i++) {
      if (!isConnected) {
        return
      }
      const line = lines[i]
      const bufferLength = buffer.reduce((total, str) => total + str.length, 0)
      // Если строка поместится в буфер то докидываем ее
      if ((line.length + bufferLength) < GRBL_BUFFER_SIZE) {
        buffer.push(line)
      } else { // буфер полный нужно отправить его на исполнение и очистить
        await waitForIdle() // подождем когда grbl прошивка будет готова к выполнению следующих команд
        await sendBuffer(buffer)
        // После выполнения очищаем буфер и пушим в него непоместившуюся строку команд
        buffer.length = 0
        buffer.push(line)
      }
    }
  }, [gcodeSend, waitForIdle])

  const value = useMemo(
    () => ({
      isConnected,
      ports,
      portResponse,
      getSerialPorts,
      connect,
      disconnect,
      gcodeSend,
      clearPortResponse,
      gcodeRunExecution
    }),
    [isConnected, ports, portResponse, getSerialPorts, connect, disconnect, gcodeSend, clearPortResponse, gcodeRunExecution]
  )

  useEffect(() => {
    void getSerialPorts()
    setInterval(() => {
      void getSerialPorts()
    }, REFRESH_PORTS_INTERVAL)
  }, [])

  useEffect(() => {
    if (!ports.find((p) => p === currentPortParameters?.port)) {
      disconnect()
    }
  }, [ports, currentPortParameters])

  return (
    <SerialContext.Provider value={value}>
      {children}
    </SerialContext.Provider>
  )
}

const useSerial = (): ISerialContext => {
  const context = useContext(SerialContext)
  if (context === undefined) {
    throw new Error('useSerial must be used within a Provider')
  }
  return context
}

export { SerialContext, SerialProvider, useSerial }
