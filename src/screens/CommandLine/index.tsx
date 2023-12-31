import { PortConnector, TerminalArea } from "../../components";
import { COLORS } from "../../theme/colors";
import { useSerial } from "../../providers/SerialProvider";

export const CommandLine = () => {
  const {portResponse} = useSerial()

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: COLORS.BACKGROUND_MAIN,
        padding: 10,
      }}>
        <PortConnector />
        <TerminalArea
          style={{
            flex: 1,
          }}
          value={portResponse}
        />
    </div>
  );
}
