import { Box } from "@mui/system";

import {  JogBlock, Text } from "../../components";

import { useSerial } from "../../providers/SerialProvider";

import { styles } from "./styles";

export const Control = () => {
 const {isConnected } = useSerial();

  if (!isConnected) {
    return (
      <Box style={styles.notConnectedContainer}>
        <Text value="Нет подключения к плате"/>
      </Box>
    )
  }

  return (
    <Box style={styles.container} overflow="auto">
      <JogBlock />
    </Box>
  );
}
