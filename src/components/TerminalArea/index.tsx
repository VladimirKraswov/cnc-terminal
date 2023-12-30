import { FC, memo, useEffect, useRef, useState } from "react";

import { COLORS } from "../../theme/colors";
import { useSerial } from "../../providers/SerialProvider";
import { MainButton } from "..";

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
    areaRef?.current?.scroll({ left: 0, top: areaRef?.current?.scrollHeight });
  }, [value])

  return (
    <div style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: COLORS.BACKGROUND_SECONDARY,
      ...style,
    }}>
      <textarea
        ref={areaRef}
        style={{
          display:'flex',
          flex: 1,
          fontFamily: 'Consolas, monaco, monospace',
          fontSize: 16,
          color: COLORS.GOLD,
          backgroundColor: COLORS.BACKGROUND_SECONDARY,
        }}
        value={value}
        readOnly
      />
      <div style={{
        display: 'flex',
      }}>
        <input
          style={{
            flex: 1,
            height: 56,
            fontSize: 24,
            color: COLORS.FONT_MAIN,
            backgroundColor: COLORS.BACKGROUND_SECONDARY,
            fontFamily: 'Consolas, monaco, monospace',
          }}
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