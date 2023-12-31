import { PortConnector, TerminalArea } from "../../components";

import { useSerial } from "../../providers/SerialProvider";

import { styles } from "./styles";

export const CommandLine = () => {
  const {portResponse} = useSerial()

  return (
    <div style={styles.container}>
      <PortConnector />
      <TerminalArea style={styles.terminalAreaContainer} value={portResponse} />
    </div>
  );
}
