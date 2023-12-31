import { COLORS } from "../../theme/colors";

export const styles: any = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  textArea: {
    display:'flex',
    flex: 1,
    fontFamily: 'Consolas, monaco, monospace',
    fontSize: 16,
    color: COLORS.GOLD,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  inputCommand: {
    display: 'flex',
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 24,
    color: COLORS.FONT_MAIN,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    fontFamily: 'Consolas, monaco, monospace',
  }
}