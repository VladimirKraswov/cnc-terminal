import {FC, memo, useCallback, useState} from "react";

import  {styles} from './styles'
import { ImageButton, NumberInput } from "../..";
import { useSerial } from "../../../providers/SerialProvider";
import { REALTIME_COMMANDS } from "../../../constants/realtimeCommands";
import { GCODE } from "../../../constants/gcode";
import { SYSTEM_COMMANDS } from "../../../constants/systemCommands";
import { HomeIcon, LaserOffIcon, LaserOnIcon, StopIcon, UnlockIcon, XAddIcon, XSubIcon, XYZeroIcon, YAddIcon, YSubIcon, ZAddIcon, ZSubIcon } from "../../../assets/images";
import { Box } from "@mui/system";

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
  const [isLaserOn, setIsLaserOn] = useState(false)

  const {send} = useSerial()

  const handleControlRun = useCallback((axis: string, step: number) => () => {
    send(GCODE.INCREMENT_MODE)
    send(`$J=${axis}${step} F${feed}`);
  }, [feed, send])

  const handleLaserOnOff = useCallback(() => {
    setIsLaserOn((prev) => {
      if (prev) {
        send('S0')
        send('G0 F0')
      } else {
        send(`G0 M3 S${laserPower}`)
        send('G1 F1')
      }

      return !prev;
    })
  }, [laserPower, send])

  return (
    <Box style={{ ...styles.container, ...style }}>
        <Box flex={1} flexDirection="column">
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
        </Box>
      {/* Jog */}

      <Box mt={2} flexDirection="row">
        <ImageButton src={UnlockIcon} hint="Unlock/Reset alarm" onPress={() => send(SYSTEM_COMMANDS.KILL_ALARM_BLOCK)} />
          
        <ImageButton style={styles.separator} src={XYZeroIcon} hint="Zero axis XY" onPress={() => send(`${GCODE.ZERO_AXIS} X0 Y0`)}/>
        {/* <ImageButton style={{ marginLeft: 5 }} src={UnlockIcon} onPress={() => send(`${GCODE.ZERO_AXIS} Z0`)}/> */}
        {/*<ImageButton src={UnlockIcon} onPress={() => send(`${GCODE.ZERO_AXIS} X0 Y0 Z0`)}/> */}
        <ImageButton style={styles.separator} src={HomeIcon} hint="Home"  onPress={() => send(SYSTEM_COMMANDS.HOME)}/>
        <ImageButton
          style={styles.separator}
          src={isLaserOn ? LaserOffIcon : LaserOnIcon }
          hint={isLaserOn ? "Laser OFF" : "Laser ON"}
          onPress={handleLaserOnOff}
        />
      </Box>

      <Box mt={1} width={266} height={1256}>
        <ImageButton style={{position: 'relative', top: 0, left: 48}} src={YAddIcon} onPress={handleControlRun('Y', steep)} />
        <ImageButton style={{position: 'relative', top: 52, }}src={StopIcon} hint="Stop"  onPress={() => send(REALTIME_COMMANDS.CANCEL_JOG)} />
        <ImageButton style={{position: 'relative', top: 104, left: -48}} src={YSubIcon} onPress={handleControlRun('Y', -steep)} />

        <ImageButton style={{position: 'relative', top: 52, left: -44 }} src={XAddIcon} onPress={handleControlRun('X', steep)} />
        <ImageButton style={{position: 'relative', top: 52, left: -(196) }} src={XSubIcon} onPress={handleControlRun('X', -steep)} />

        <ImageButton style={{position: 'relative', top: 0, left: -28 }} src={ZAddIcon} onPress={handleControlRun('Z', steep)} />
        <ImageButton style={{position: 'relative', top: 104, left: -76 }}  src={ZSubIcon} onPress={handleControlRun('Z', -steep)} />
      </Box>
    </Box>
  )})

  JogBlock.displayName = 'JogBlock';