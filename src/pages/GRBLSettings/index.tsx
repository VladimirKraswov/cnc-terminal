import { type FC, type ReactNode, useEffect, useState } from 'react'

import { Box } from '@mui/system'

import { MainButton, NumberInput, Text } from '../../components'

import { styles } from './styles'
import { useSerial } from '../../providers/SerialProvider'
import { type IOption } from './types'
import { SETTINGS } from './constants'

const parseGRBLSettings = (gcode: string): IOption[] => {
  const lines = gcode.split('\n')

  return SETTINGS.map((option) => {
    const findLine = lines.find((line) => line.includes(option.gcode))
    if (findLine) {
      const equalsIndex = findLine.indexOf('=')
      const substring = findLine.substring(equalsIndex + 1)
      return { ...option, value: Number(substring.trim()) }
    }
    return option
  }
  )
}

export const GRBLSettings: FC = () => {
  const [settings, setSettings] = useState(SETTINGS)
  const [terminal, setTerminal] = useState('')

  const { isConnected, gcodeSend, portResponse, clearPortResponse } = useSerial()

  const getSettings = (): void => {
    clearPortResponse()
    gcodeSend('$$')
  }

  const handleSave = (option: IOption): void => {
    gcodeSend(`${option.gcode}=${option.value.toString()}`)
    setSettings((prev: IOption[]) => prev.map((opt: IOption) => opt.gcode !== option.gcode ? opt : { ...opt, draft: false }))
  }

  const handleChange = (field: string, value?: number): void => {
    if (value) {
      setSettings((prev: IOption[]) => prev.map((opt: IOption) => opt.gcode !== field ? opt : { ...opt, value, draft: true }))
    }
  }

  const renderRightElement = (option: IOption): ReactNode | null => {
    if (!option.draft) {
      return null
    }

    return <MainButton style={{ height: 10, width: 100 }} text="Save" onPress={() => { handleSave(option) }} />
  }

  useEffect(() => {
    setTerminal((prev) => `${prev}${portResponse}`)
  }, [portResponse])

  useEffect(() => {
    if (terminal.includes('ok')) {
      setSettings(parseGRBLSettings(terminal))
    }
  }, [terminal])

  if (!isConnected) {
    return (
      <Box style={styles.notConnectedContainer}>
        <Text value="Нет подключения к плате"/>
      </Box>
    )
  }

  return (
    <Box style={styles.container} overflow="auto">
      <Box flexDirection="column">
        <MainButton text="Get Settings" onPress={getSettings}/>
        {settings.map((option) => (
          <NumberInput
            key={option.gcode}
            label={`{${option.gcode}} ${option.label}`}
            // min={-1000}
            // max={1000}
            shiftMultiplier={5}
            step={1}
            value={option.value}
            onChange={(_, value) => { handleChange(option.gcode, value) }}
            renderRightElement={() => renderRightElement(option)}
          />
        ))}
      </Box>
    </Box>
  )
}
