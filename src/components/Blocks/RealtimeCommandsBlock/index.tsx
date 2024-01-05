import { type FC, memo, useCallback } from 'react'

import { MainButton } from '../..'
import { useSerial } from '../../../providers/SerialProvider'
import { REALTIME_COMMANDS } from '../../../constants/realtimeCommands'
import { SYSTEM_COMMANDS } from '../../../constants/systemCommands'

import { styles } from './styles'

interface IMainButtonProps {
  style?: any
}

export const RealtimeCommandsBlock: FC<IMainButtonProps> = memo(({ style }) => {
  const { send } = useSerial()

  const handleSoftReset = useCallback(() => {
    send(REALTIME_COMMANDS.SOFT_RESET)
  }, [send])

  const handleKillAlarmBlock = useCallback(() => {
    send(SYSTEM_COMMANDS.KILL_ALARM_BLOCK)
  }, [send])

  const handleErasesAndRestores = useCallback(() => {
    send(SYSTEM_COMMANDS.ERASES_AND_RESTORES)
  }, [send])

  const handleErasesAndZerosAllCoordinate = useCallback(() => {
    send(SYSTEM_COMMANDS.ERASES_AND_ZEROS_ALL_COORDINATE)
  }, [send])

  const handleClearsAndRestoresAll = useCallback(() => {
    send(SYSTEM_COMMANDS.CLEARS_AND_RESTORES_ALL)
  }, [send])

  return (
    <div style={{ ...styles.container, ...style }}>
      <MainButton text="Soft reset" onPress={handleSoftReset}/>
      <MainButton text="Kill alarm block" onPress={handleKillAlarmBlock}/>
      <MainButton text="Erases and restores" onPress={handleErasesAndRestores}/>
      <MainButton text="Erases and zeros all coordinate" onPress={handleErasesAndZerosAllCoordinate}/>
      <MainButton text="Clears and restores all" onPress={handleClearsAndRestoresAll}/>
    </div>
  )
})

RealtimeCommandsBlock.displayName = 'RealtimeCommandsBlock'
