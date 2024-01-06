export interface IPortParameters {
  port: string
  baud: string
  ending: string
}

export interface ISerialContext {
  isConnected: boolean
  ports: string[]
  portResponse: string
  getSerialPorts: () => void
  connect: (port: string, baud: string, ending: string) => Promise<boolean>
  disconnect: () => void
  gcodeSend: (command: string) => void
  clearPortResponse: () => void
  gcodeRunExecution: (gcode: string) => void
}

export interface Payload {
  message: string
}

export interface SerialEvent {
  payload: Payload
}
