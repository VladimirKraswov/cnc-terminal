import { invoke } from '@tauri-apps/api/tauri'
import { type SerialBaud } from '../constants'

async function handleGetPorts (): Promise<string> {
  return await invoke('get_ports', {})
}

const convertEnding = (ending: string): string => {
  switch (ending) {
    case 'None':
      return ''
    case '\\n':
      return '\n'
    case '\\r':
      return '\r'
    case '\\n\\r':
      return '\n\r'
    default:
      return '' // Default to an empty string if the label is not recognized
  }
}

const handleConnect = async (port: string, baud: SerialBaud, ending: string): Promise<boolean> => {
  ending = convertEnding(ending)
  await invoke('set_port_items', { port, baud, ending })
  const isConnected = await invoke('handle_serial_connect', {})
  return isConnected as boolean
}

const getBaudList = (): string[] => {
  return [
    '300',
    '1200',
    '2400',
    '4800',
    '9600',
    '19200',
    '38400',
    '57600',
    '74880',
    '115200',
    '230400',
    '250000',
    '500000',
    '1000000',
    '2000000'
  ]
}

const getEnding = (): string[] => {
  return [
    'None',
    '\\n',
    '\\r',
    '\\n\\r'
  ]
}

const handleRecord = async (): Promise<any> => {
  const res = await invoke('handle_start_record', {})
  return res
}

const handleSend = async (input: string): Promise<any> => {
  await invoke('send_serial', { input })
}

const handleSetFolder = async (): Promise<any> => {
  await invoke('set_folder_path', {})
}

const sendError = async (input: string): Promise<any> => {
  await invoke('emit_error', { input })
}

export { handleGetPorts, handleConnect, handleRecord, handleSend, handleSetFolder, getBaudList, getEnding, sendError }
