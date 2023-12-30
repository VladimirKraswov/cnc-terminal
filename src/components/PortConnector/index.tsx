import { useCallback, useState } from "react";

import {Select, MenuItem} from "@mui/material";
import { useSerial } from "../../providers/SerialProvider";
import { getEnding } from "../../utils/serial";
import { MainButton } from "../MainButton";
import { Text } from "../Text";
import { COLORS } from "../../theme/colors";


export const PortConnector = () => {
  const {isConnected, ports, connect, getPorts } = useSerial();
  const [selectPort, setSelectPort] = useState<string | null>(null)

  const handleChangePort =  useCallback((event: any) => {
    setSelectPort(event.target.value);
  }, []) 

  const handleConnect = useCallback(async () => {
    if (selectPort) {
    await connect(selectPort, '115200', getEnding()[1])
    }
  }, [selectPort, connect]);

  const handleDisconnect = useCallback(async () => {
    if (selectPort) {
      await connect('null', '0', '')
    }
  }, [selectPort, connect]);

  return (
    <div style={{ width: '100%' }}>
      <Select
        style={{
          flex: 1,
          color: COLORS.FONT_MAIN,
          backgroundColor: COLORS.BACKGROUND_SECONDARY,
          fontSize: 24,
        }}
        displayEmpty
        value={selectPort}
        onChange={handleChangePort}
        renderValue={
          selectPort ? undefined : () => <Text style={{ fontSize: 24 }} value={'Select serial port'}/>
        }
      >
        {ports.map((port) => <MenuItem key={port} value={port}>{port}</MenuItem>)}
      </Select>
      <MainButton text="Refresh"  onPress={getPorts}/>
      <MainButton
        style={{
          color: isConnected ? COLORS.BACKGROUND_MAIN : COLORS.RICH_RED_ORANGE,
          backgroundColor: isConnected ? COLORS.SUCCESS : COLORS.BACKGROUND_SECONDARY, 
        }}
        text="Connect"
        onPress={handleConnect}
      />
      <MainButton text="Disconnect"  onPress={handleDisconnect}/>
    </div>

  )
}