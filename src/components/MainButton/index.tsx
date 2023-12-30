import {FC, memo} from "react";

import {COLORS} from "../../theme/colors";

interface IMainButtonProps {
  style?: any
  text: string
  onPress: () => void
}

export const MainButton: FC<IMainButtonProps> = memo(({style, text, onPress}) => {
  return (
    <button
      style={{
        backgroundColor: COLORS.BACKGROUND_NIGHT,
        color: COLORS.RICH_RED_ORANGE,
        fontFamily: 'Consolas, monaco, monospace',
        fontSize: 18,
        borderColor: COLORS.BACKGROUND_SECONDARY,
        ...style,
      }}
      onClick={onPress}
    >
      {text}
    </button>
  )
})

MainButton.displayName = 'MainButton';