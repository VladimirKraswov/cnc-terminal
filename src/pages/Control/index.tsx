import { useEffect, useState } from "react";

import { Box } from "@mui/system";

import {  JogBlock, MainButton, NumberInput, Text } from "../../components";

import { styles } from "./styles";
import { useSerial } from "../../providers/SerialProvider";
import { IOption } from "./types";
import { SETTINGS } from "./constants";
import { GCODE } from "../../constants/gcode";

export const Control = () => {
 const {isConnected, send, portResponse, clear } = useSerial();

  useEffect(() => {
   
  }, [])

  if (!isConnected) {
    return (
      <Box style={styles.notConnectedContainer}>
        <Text value="Нет подключения к плате"/>
      </Box>
    )
  }

  return (
    <Box style={styles.container} overflow="auto">
      <JogBlock />
    </Box>
  );
}
