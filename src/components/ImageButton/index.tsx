import {FC, memo} from "react";

import  {styles} from './styles'

interface IImageButtonProps {
  style?: any
  image: string
  alt?: string
  onPress: () => void
}

export const ImageButton: FC<IImageButtonProps> = memo(({style, image, alt, onPress}) => (
    <button
      style={{ ...styles.container, ...style }}
      onClick={onPress}
    >
      <img src={image} alt={alt}/>
    </button>
  ))

ImageButton.displayName = 'ImageButton';