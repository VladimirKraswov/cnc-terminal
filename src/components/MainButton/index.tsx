import {FC, memo} from "react";

import {COLORS} from "../../theme/colors";

interface IMainButtonProps {
  style?: any
  text: string
  onPress: () => void
}

export const MainButton: FC<IMainButtonProps> = memo(({style, text, onPress}) => (
    <button
      style={{
        backgroundColor:  COLORS.CHOCOLATE,
        color: COLORS.FONT_MAIN,
        borderColor: COLORS.FONT_MAIN,
        fontFamily: 'Consolas, monaco, monospace',
        fontSize: 18,
        borderRadius: 8,
        padding: 10,
        ...style,
      }}
      onClick={onPress}
    >
      {text}
    </button>
  ))

MainButton.displayName = 'MainButton';