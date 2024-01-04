import { Box } from "@mui/system";

import {  JogBlock, Text } from "../../components";

import { useSerial } from "../../providers/SerialProvider";

import { styles } from "./styles";
import { COLORS } from "../../theme/colors";

export const Control = () => {
 const {isConnected } = useSerial();

  // if (!isConnected) {
  //   return (
  //     <Box style={styles.notConnectedContainer}>
  //       <Text value="Нет подключения к плате"/>
  //     </Box>
  //   )
  // }

  return (
    <Box style={styles.container} overflow="auto">
      <Box flex={1} bgcolor={COLORS.BACKGROUND_NIGHT} />
      <JogBlock style={{ padding: 10 }} />
    </Box>
  );
}
