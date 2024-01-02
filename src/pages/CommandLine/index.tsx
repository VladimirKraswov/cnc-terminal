import { Box } from "@mui/system";
import { PortConnector, TerminalArea } from "../../components";

import { styles } from "./styles";

export const CommandLine = () => {

  return (
    <Box style={styles.container}>
      <PortConnector />
      <TerminalArea/>
    </Box>
  );
}
