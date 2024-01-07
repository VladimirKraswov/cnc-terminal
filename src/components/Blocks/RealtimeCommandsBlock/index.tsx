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
  const { gcodeSend } = useSerial()

  const handleSoftReset = useCallback(() => {
    gcodeSend(REALTIME_COMMANDS.SOFT_RESET)
  }, [gcodeSend])

  const handleKillAlarmBlock = useCallback(() => {
    gcodeSend(SYSTEM_COMMANDS.KILL_ALARM_BLOCK)
  }, [gcodeSend])

  const handleErasesAndRestores = useCallback(() => {
    gcodeSend(SYSTEM_COMMANDS.ERASES_AND_RESTORES)
  }, [gcodeSend])

  const handleErasesAndZerosAllCoordinate = useCallback(() => {
    gcodeSend(SYSTEM_COMMANDS.ERASES_AND_ZEROS_ALL_COORDINATE)
  }, [gcodeSend])

  const handleClearsAndRestoresAll = useCallback(() => {
    gcodeSend(SYSTEM_COMMANDS.CLEARS_AND_RESTORES_ALL)
  }, [gcodeSend])

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
