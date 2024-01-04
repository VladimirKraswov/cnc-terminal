import { FC, memo, useEffect, useRef, useState } from "react";

import { Box } from "@mui/system";
import { useSerial } from "../../providers/SerialProvider";
import { MainButton } from "../MainButton";

import { styles } from './styles'

export const TerminalArea: FC = memo(() => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null)
  const [command, setCommand] = useState('');
  const [terminal, setTerminal] = useState('')

  const {send, portResponse} = useSerial()

  const handleReturn = () => { 
    send(command);
    setCommand('');
  }
  
  useEffect(() => {
    setTerminal((prev) => `${prev}${portResponse}`)
    areaRef?.current?.scroll({ top: areaRef?.current?.scrollHeight })
  }, [portResponse])

  return (
    <Box style={styles.container}>
      <textarea
        style={styles.textArea}
        ref={areaRef}
        value={terminal}
        readOnly
      />
      <Box style={styles.inputCommand}>
        <input
          style={styles.input}
          value={command}
          onChange={(e) => setCommand(e.currentTarget.value)}
          placeholder="Enter a command..."    
        />
        <MainButton text="Return"  onPress={handleReturn}/>
        <MainButton text="Clear"  onPress={() => setTerminal('')}/>
      </Box>
    </Box>
  )
});

TerminalArea.displayName = 'TerminalArea';