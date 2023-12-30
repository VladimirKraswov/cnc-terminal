import { FC } from "react";

import { Typography, TypographyProps } from "@mui/material";

import {styles} from './styles'

interface ITextProps extends TypographyProps {
  style?: any
  value: string
}

export const Text: FC<ITextProps> = ({ style, value, ...rest }) => (
  <Typography style={{...styles.container, ...style}} {...rest}>{value}</Typography>
);