import { COLORS } from "../../theme/colors";

import { TStyles } from "../../types";

export const styles: TStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  textArea: {
    display:'flex',
    flex: 1,
    fontFamily: 'Consolas, monaco, monospace',
    fontSize: '16px',
    color: COLORS.PRIMARY,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  inputCommand: {
    marginTop: '5px',
  },
  input: {
    flex: 1,
    height: '48px',
    fontSize: '24px',
    color: COLORS.FONT_MAIN,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    fontFamily: 'Consolas, monaco, monospace',
  }
}