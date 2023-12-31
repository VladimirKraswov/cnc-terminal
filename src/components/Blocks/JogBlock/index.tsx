import {FC, memo, useCallback} from "react";

import  {styles} from './styles'
import { MainButton } from "../..";
import { useSerial } from "../../../providers/SerialProvider";
import { REALTIME_COMMANDS } from "../../../constants/realTimeCommands";
interface IMainButtonProps {
  style?: any
}

const STEP = 50;
const FEED = 2000


export const JogBlock: FC<IMainButtonProps> = memo(({style}) => {
  const {send} = useSerial()

  const handleJogAddY = useCallback(() => {
    send(`$J=Y${STEP} F${FEED}`);
  }, [])

  const handleJogSubY = useCallback(() => {
    send(`$J=Y${-STEP} F${FEED}`);
  }, [])

  const handleJogAddX = useCallback(() => {
    send(`$J=X${STEP} F${FEED}`);
  }, [])

  const handleJogSubX = useCallback(() => {
    send(`$J=X${-STEP} F${FEED}`);
  }, [])

  const handleJogAddZ = useCallback(() => {
    send(`$J=Z${STEP} F${FEED}`);
  }, [])

  const handleJogSubZ = useCallback(() => {
    send(`$J=Z${-STEP} F${FEED}`);
  }, [])

  const handleStop = useCallback(() => {
    send(REALTIME_COMMANDS.CANCEL_JOG);
  }, [])

  return (
    <div style={{ ...styles.container, ...style }}>
      <MainButton text="Y+" onPress={handleJogAddY}/>
      <MainButton text="Y-" onPress={handleJogSubY}/>
      <MainButton text="X+" onPress={handleJogAddX}/>
      <MainButton text="X-" onPress={handleJogSubX}/>
      <MainButton text="Z+" onPress={handleJogAddZ}/>
      <MainButton text="Z-" onPress={handleJogSubZ}/>
      <MainButton text="Stop" onPress={handleStop}/>
    </div>
  )})

  JogBlock.displayName = 'JogBlock';