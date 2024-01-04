import {FC, memo} from "react";

import { ButtonBase, Tooltip } from "@mui/material";

interface IImageButtonProps {
  style?: any
  imageStyle?: any,
  src: string
  alt?: string
  size?: number
  hint?: string
  onPress: () => void
}

export const ImageButton: FC<IImageButtonProps> = memo(({style, imageStyle, src, alt, size=48, hint, onPress}) => (
  <ButtonBase style={{ width: size, height: size, ...style }} focusRipple onClick={onPress} >
    <Tooltip title={hint ?? ''}>
      <img style={imageStyle} width={size} height={size} src={src} alt={alt}/>
    </Tooltip>
  </ButtonBase>
  ))

ImageButton.displayName = 'ImageButton';