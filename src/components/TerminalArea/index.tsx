import { type FC, memo, useEffect, useRef, useState } from 'react'

import { open } from '@tauri-apps/api/dialog'
import { readTextFile } from '@tauri-apps/api/fs'

import { Box } from '@mui/system'
import { useSerial } from '../../providers/SerialProvider'
import Input from '@mui/material/Input'

import { styles } from './styles'
import { ImageButton, MainButton } from '..'
import { ClearIcon, ReturnIcon } from '../../assets/images'

export const TerminalArea: FC = memo(() => {
  const areaRef = useRef<HTMLTextAreaElement | null>(null)
  const [command, setCommand] = useState('')
  const [terminal, setTerminal] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { portResponse, isConnected, gcodeRunExecution, gcodeSend, clearPortResponse } = useSerial()

  const handleReturn = (): void => {
    gcodeSend(command)
    setCommand('')
  }

  const runExecution = async (): Promise<void> => {
    const selected = await open({
      multiple: false,
      filters: [{
        name: 'gcode',
        extensions: ['nc', 'gcode']
      }]
    })
    if (selected && !Array.isArray(selected)) {
      const contents = await readTextFile(selected)
      clearPortResponse()
      gcodeRunExecution(contents)
    }
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
        <Input
          style={styles.input}
          value={command}
          onChange={(e) => { setCommand(e.currentTarget.value) }}
          placeholder="Enter a command..."
        />
        <Box width={5} />
        <ImageButton src={ReturnIcon} hint="" isDisabled={!isConnected} onPress={handleReturn} />
        <Box width={5} />
        <ImageButton src={ClearIcon} hint="" isDisabled={!isConnected} onPress={() => { setTerminal('') }} />
        <Box width={5} />
        <MainButton style={{ height: 48 }} text='Open' onPress={runExecution} />
      </Box>
    </Box>
  )
})

TerminalArea.displayName = 'TerminalArea'
