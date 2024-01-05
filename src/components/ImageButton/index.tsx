import { type FC, memo } from 'react'

import { ButtonBase, Tooltip } from '@mui/material'
import { Box } from '@mui/system'

interface IImageButtonProps {
  style?: any
  imageStyle?: any
  src: string
  alt?: string
  size?: number
  hint?: string
  isDisabled?: boolean
  onPress: () => void
}

export const ImageButton: FC<IImageButtonProps> = memo(({ style, imageStyle, src, alt, size = 48, hint, isDisabled, onPress }) => (
  <ButtonBase style={{ width: size, height: size, ...style }} focusRipple disabled={isDisabled} onClick={onPress} >
    <Tooltip title={hint ?? ''}>
      <img style={imageStyle} width={size} height={size} src={src} alt={alt}/>
    </Tooltip>
    {isDisabled && <Box position="absolute" bgcolor="#CCCCCCAA" borderRadius={2} width={48} height={48} left={0}/>}
  </ButtonBase>
))

ImageButton.displayName = 'ImageButton'
