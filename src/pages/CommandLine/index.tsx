import { Box } from "@mui/system";
import { PortConnector, TerminalArea } from "../../components";

import { styles } from "./styles";

export const CommandLine = () => (
    <Box style={styles.container}>
      <PortConnector />
      <Box height={5}/>
      <TerminalArea/>
    </Box>
  )
