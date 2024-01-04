import { useCallback, useState } from "react";

import {Select, MenuItem} from "@mui/material";
import { Box } from "@mui/system";

import { useSerial } from "../../providers/SerialProvider";
import { getEnding } from "../../utils/serial";

import { Text } from "../Text";
import { ImageButton } from "../ImageButton";

import { ConnectIcon, DisconnectIcon, RefreshIcon } from "../../assets/images";

import { styles } from "./styles";


export const PortConnector = () => {
  const [selectPort, setSelectPort] = useState<string | null>(null)

  const {isConnected, ports, connect, disconnect, getPorts } = useSerial();

  const handleChangePort =  useCallback((event: any) => {
    setSelectPort(event.target.value);
  }, []) 

  const handleConnect = useCallback(async () => {
    if(!selectPort) {
      return
    }

    if (isConnected) {
      disconnect()
    } else {
      await connect(selectPort, '115200', getEnding()[1])
    }
  }, [selectPort, connect]);


  return (
    <div style={styles.container}>
      <Select
        style={styles.selectContainer}
        displayEmpty
        value={selectPort}
        onChange={handleChangePort}
        renderValue={
          selectPort ? undefined : () => <Text style={{ fontSize: 24 }} value={'Select serial port'}/>
        }
      >
        {ports.map((port) => <MenuItem style={{ fontFamily: 'Consolas, monaco, monospace', }} key={port} value={port}>{port}</MenuItem>)}
      </Select>
      <Box width={5} />
      <ImageButton src={RefreshIcon} hint="" onPress={getPorts} />
      <Box width={5} />
      <ImageButton src={isConnected ? DisconnectIcon : ConnectIcon} hint="" onPress={handleConnect} />
      <Box width={5} />

    </div>

  )
}
