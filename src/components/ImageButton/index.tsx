import {FC, memo} from "react";

import { ButtonBase, Tooltip } from "@mui/material";

interface IImageButtonProps {
  style?: any
  src: string
  alt?: string
  size?: number
  hint?: string
  onPress: () => void
}

export const ImageButton: FC<IImageButtonProps> = memo(({style, src, alt, size=48, hint, onPress}) => (
  <ButtonBase style={{ width: size, height: size, ...style }} focusRipple onClick={onPress} >
    {!!hint ? (
      <Tooltip title={hint}>
        <img width={size} height={size} src={src} alt={alt}/>
      </Tooltip>
    ) : (
      <img width={size} height={size} src={src} alt={alt}/>
    )}
  </ButtonBase>
  ))

ImageButton.displayName = 'ImageButton';