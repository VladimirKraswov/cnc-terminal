import {FC, memo, useCallback, useState} from "react";

import  {styles} from './styles'
import { MainButton, NumberInput } from "../..";
import { useSerial } from "../../../providers/SerialProvider";
import { REALTIME_COMMANDS } from "../../../constants/realtimeCommands";
import { GCODE } from "../../../constants/gcode";
import { SYSTEM_COMMANDS } from "../../../constants/systemCommands";
interface IMainButtonProps {
  style?: any
}

const STEP = 50;
const FEED = 2000


export const JogBlock: FC<IMainButtonProps> = memo(({style}) => {
  const [steep, setSteep] = useState<number>(STEP)
  const [feed, setFeed] = useState<number>(FEED)

  const {send} = useSerial()

  const handleControlRun = useCallback((axis: string, step: number) => () => {
    send(GCODE.INCREMENT_MODE)
    send(`$J=${axis}${step} F${feed}`);
  }, [])

  return (
    <div style={{ ...styles.container, ...style }}>
        <NumberInput
          label="Шаг"
          // min={-1000}
          // max={1000}
          shiftMultiplier={5} 
          step={1}
          value={steep}
          onChange={(_, value) => setSteep(value as number)}
        />
        <NumberInput
          label="Скорость"
          // min={-1000}
          // max={1000}
          shiftMultiplier={5} 
          step={1}
          value={feed}
          onChange={(_, value) => setFeed(value as number)}
        />
      <MainButton text="Y+" onPress={handleControlRun('Y', steep)}/>
      <MainButton text="Y-" onPress={handleControlRun('Y', -steep)}/>
      <MainButton text="X+" onPress={handleControlRun('X', steep)}/>
      <MainButton text="X-" onPress={handleControlRun('X', -steep)}/>
      <MainButton text="Z+" onPress={handleControlRun('Z', steep)}/>
      <MainButton text="Z-" onPress={handleControlRun('Z', -steep)}/>
      <MainButton text="Stop" onPress={() => send(REALTIME_COMMANDS.CANCEL_JOG)}/>
      <MainButton text="Unlock" onPress={() => send(SYSTEM_COMMANDS.KILL_ALARM_BLOCK)}/>
    </div>
  )})

  JogBlock.displayName = 'JogBlock';