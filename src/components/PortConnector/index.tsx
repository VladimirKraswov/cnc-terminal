import { useCallback, useState } from "react";

import {Select, MenuItem} from "@mui/material";
import { useSerial } from "../../providers/SerialProvider";
import { getEnding } from "../../utils/serial";
import { MainButton } from "../MainButton";
import { Text } from "../Text";
import { COLORS } from "../../theme/colors";


export const PortConnector = () => {
  const [selectPort, setSelectPort] = useState<string | null>(null)

  const {isConnected, ports, connect, disconnect, getPorts } = useSerial();

  const handleChangePort =  useCallback((event: any) => {
    setSelectPort(event.target.value);
  }, []) 

  const handleConnect = useCallback(async () => {
    if (selectPort) {
    await connect(selectPort, '115200', getEnding()[1])
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
          fontFamily: 'Consolas, monaco, monospace',
        }}
        displayEmpty
        value={selectPort}
        onChange={handleChangePort}
        renderValue={
          selectPort ? undefined : () => <Text style={{ fontSize: 24 }} value={'Select serial port'}/>
        }
      >
        {ports.map((port) => <MenuItem style={{ fontFamily: 'Consolas, monaco, monospace', }} key={port} value={port}>{port}</MenuItem>)}
      </Select>
      <MainButton text="Refresh"  onPress={getPorts}/>
      <MainButton
        style={{
          backgroundColor: isConnected ? COLORS.SUCCESS : COLORS.CHOCOLATE, 
        }}
        text="Connect"
        onPress={handleConnect}
      />
      <MainButton text="Disconnect"  onPress={disconnect}/>
    </div>

  )
}
