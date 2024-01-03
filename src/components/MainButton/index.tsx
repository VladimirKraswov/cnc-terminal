import {FC, memo} from "react";

import  {styles} from './styles'

interface IMainButtonProps {
  style?: any
  text: string
  onPress: () => void
}

export const MainButton: FC<IMainButtonProps> = memo(({style, text, onPress}) => (
    <button
      style={{ ...styles.container, ...style }}
      onClick={onPress}
    >
      {text}
    </button>
  ))

MainButton.displayName = 'MainButton';