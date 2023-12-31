import { FC, memo, useEffect, useRef, useState } from "react";

import { useSerial } from "../../providers/SerialProvider";
import { MainButton } from "../MainButton";

import { styles } from './styles'

interface ITerminalAreaProps {
  style?: any
  value: string
}

export const TerminalArea: FC<ITerminalAreaProps> = memo(({ style, value }) => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null)
  const [command, setCommand] = useState('');

  const {send, clear} = useSerial()

  const handleReturn = () => {
    send(command);
    setCommand('');
  }
  
  useEffect(() => {
    areaRef?.current?.scroll({ top: areaRef?.current?.scrollHeight })
  }, [value])

  return (
    <div style={{ ...styles.container, ...style}}>
      <textarea
        ref={areaRef}
        style={styles.textArea}
        value={value}
        readOnly
      />
      <div style={styles.inputCommand}>
        <input
          style={styles.input}
          value={command}
          onChange={(e) => setCommand(e.currentTarget.value)}
          placeholder="Enter a command..."    
        />
        <MainButton text="Return"  onPress={handleReturn}/>
        <MainButton text="Clear"  onPress={clear}/>
      </div>
    </div>
  )
});

TerminalArea.displayName = 'TerminalArea';