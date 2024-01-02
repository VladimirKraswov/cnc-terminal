import { useState } from "react";

import { Box } from "@mui/system";

import {  MainButton, NumberInput, Text } from "../../components";

import { styles } from "./styles";
import { useSerial } from "../../providers/SerialProvider";
import { IOption } from "./types";
import { SETTINGS } from "./constants";

const wait = (timeout: number) => new Promise((resolve) => {
  setTimeout(() => resolve(true), timeout);
});

const parseGRBLSettings = (gcode: string): IOption[] => {
  const lines = gcode.split('\n');

  return SETTINGS.map((option) => {
    const findLine = lines.find((line) => line.includes(option.gcode))
    if (findLine) {
        const equalsIndex = findLine.indexOf('=');
        const substring = findLine.substring(equalsIndex + 1);
        return {...option, value: substring.trim()}
    }
      return option
    }
)}

export const GRBLSettings = () => {
  const [settings, setSettings] = useState(SETTINGS)
  const {isConnected, send, portResponse, clear } = useSerial();

  const getSettings = async () => {
    clear()
    await send('$$')
    await wait(1000)
    setSettings(parseGRBLSettings(portResponse))
  }

  const handleSave = (option: IOption) => {
    send(`${option.gcode}=${option.value}`)
    setSettings((prev: IOption[]) => prev.map((opt: IOption) => opt.gcode !== option.gcode ? opt : {...opt, draft: undefined}))
  }

  // const handleRestore = (option: IOption) => {
  //   const tmp = JSON.parse(JSON.stringify(settings.find((opt) => opt.gcode === option.gcode)?.draft));
  //   setSettings((prev: IOption[]) => prev.map((opt: IOption) => opt.gcode !== option.gcode ? opt : {...opt, value: tmp, draft: undefined}))
  // }

  const handleChange = (field: string, value: number | string) => {
    setSettings((prev: IOption[]) => prev.map((opt: IOption) => opt.gcode !== field ? opt : {...opt, value}))
  }

  const renderRightElement = (option: IOption) => {
    if (!option.draft) {
      return null
    }
    
    return (
      <>
        <MainButton style={{ height: 10, width: 100 }} text="Save" onPress={() => handleSave(option)} />
        {/* <Box width={5} />
        <MainButton style={{ height: 10, width: 100 }} text="Restore" onPress={() => handleRestore(option)} /> */}
      </>
    )
  }

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
            value={option.value as number}
            onChange={(_, value) => handleChange(option.gcode, value as number)}
            renderRightElement={() => renderRightElement(option)}
          />
        ))}
      </Box>
    </Box>
  );
}
