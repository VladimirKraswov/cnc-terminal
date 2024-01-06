import { createContext, useCallback, useContext, useState, useMemo, type FC, useEffect, useRef } from 'react'
import { type UnlistenFn, listen } from '@tauri-apps/api/event'

import { getEnding, handleConnect, handleGetPorts, handleSend } from './utils/serial'

import { wait } from './utils/wait'
import { GRBL_BUFFER_SIZE, RESERVE, REFRESH_PORTS_INTERVAL } from './constants'
import { type IPortParameters, type ISerialContext, type Payload, type SerialEvent } from './types'

const SerialContext = createContext<ISerialContext | undefined>(undefined)

const SerialProvider: FC<any> = ({ children }): any => {
  const [ports, setPorts] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [portResponse, setPortResponse] = useState<string>('')
  const unlistenFnRef = useRef<UnlistenFn | null>(null)
  const [currentPortParameters, setCurrentPortParameters] = useState<IPortParameters | null>(null)
  const portResponseRef = useRef('')

  const startSerialEventListener = useCallback(async () => {
    return await listen<Payload>('updateSerial', (event: SerialEvent) => {
      portResponseRef.current = `${portResponseRef.current}${event.payload.message}`
      setPortResponse(event.payload.message)
    })
  }, [])

  const getSerialPorts = useCallback(async () => {
    const p = await handleGetPorts()
    setPorts(p.toString().split(','))
  }, [])

  const connect = useCallback(async (port: string, baud = '115200', ending = getEnding()[1]) => {
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
    await wait(100)
    return portResponseRef.current
  }, [])

  const clearPortResponse = useCallback(() => {
    portResponseRef.current = ''
  }, [])

  const waitForIdle = async (): Promise<void> => {
    while (true) {
      const status = await gcodeSend('?')
      if (status.includes('Idle')) {
        return
      }
      await wait(100)
    }
  }

  // Отправить буфер с gcode на выполнение
  const sendBuffer = async (buffer: string[]): Promise<void> => {
    for (let i = 0; i < buffer.length; i++) {
      const bufferLine = buffer[i]
      const res = await gcodeSend(bufferLine)
      if (res.includes('error')) {
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
      const line = lines[i]
      const bufferLength = buffer.reduce((total, str) => total + str.length, 0)
      // Если строка поместится в буфер то докидываем ее
      if (line.length + bufferLength < GRBL_BUFFER_SIZE - RESERVE) {
        buffer.push(line)
      } else { // буфер полный нужно отправить его на исполнение и очистить
        await waitForIdle() // подождем когда grbl прошивка будет готова к выполнению следующих команд
        await sendBuffer(buffer)
        // После выполнения очищаем буфер и пушим в него непоместившуюся строку команд
        buffer.length = 0
        buffer.push(line)
      }
    }
  }, [gcodeSend])

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
  }, [ports])

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
