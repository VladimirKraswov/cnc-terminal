import { type MachineStates, type JobStates } from '../constants'

export const isState = (str: string, state: JobStates | MachineStates): boolean => {
  return str.includes(state)
}
