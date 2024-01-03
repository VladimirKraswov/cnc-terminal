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
const LASER_POWER = 1000


export const JogBlock: FC<IMainButtonProps> = memo(({style}) => {
  const [steep, setSteep] = useState<number>(STEP)
  const [feed, setFeed] = useState<number>(FEED)
  const [laserPower, setLaserPower] = useState<number>(LASER_POWER)

  const {send} = useSerial()

  const handleControlRun = useCallback((axis: string, step: number) => () => {
    send(GCODE.INCREMENT_MODE)
    send(`$J=${axis}${step} F${feed}`);
  }, [feed, send])

  const handleLaserOn = useCallback(() => {
    send(`G0 M3 S${laserPower}`)
    send('G1 F1')
  }, [laserPower, send])

  const handleLaserOff = useCallback(() => {
    send('S0')
    send('G0 F0')
  }, [send])

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
        <NumberInput
          label="Мощность лазера"
          // min={-1000}
          // max={1000}
          shiftMultiplier={5} 
          step={1}
          value={laserPower}
          onChange={(_, value) => setLaserPower(value as number)}
        />
      {/* Jog */}
      <MainButton text="Y+" onPress={handleControlRun('Y', steep)}/>
      <MainButton text="Y-" onPress={handleControlRun('Y', -steep)}/>
      <MainButton text="X+" onPress={handleControlRun('X', steep)}/>
      <MainButton text="X-" onPress={handleControlRun('X', -steep)}/>
      <MainButton text="Z+" onPress={handleControlRun('Z', steep)}/>
      <MainButton text="Z-" onPress={handleControlRun('Z', -steep)}/>
      <MainButton text="Stop" onPress={() => send(REALTIME_COMMANDS.CANCEL_JOG)}/>
      <MainButton text="Unlock" onPress={() => send(SYSTEM_COMMANDS.KILL_ALARM_BLOCK)}/>
      {/* Zero axis */}
      <MainButton text="Zero XY" onPress={() => send(`${GCODE.ZERO_AXIS} X0 Y0`)}/>
      <MainButton text="Zero Z" onPress={() => send(`${GCODE.ZERO_AXIS} Z0`)}/>
      <MainButton text="Zero All" onPress={() => send(`${GCODE.ZERO_AXIS} X0 Y0 Z0`)}/>
      {/* Home */}
      <MainButton text="Home" onPress={() => send(SYSTEM_COMMANDS.HOME)}/>
      {/* Laser/Spindle */}
      <MainButton text="Laser ON" onPress={handleLaserOn}/>
      <MainButton text="Laser OFF" onPress={handleLaserOff}/>
    </div>
  )})

  JogBlock.displayName = 'JogBlock';