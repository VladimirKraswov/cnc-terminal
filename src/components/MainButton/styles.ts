import { COLORS } from "../../theme/colors";

import { TStyles } from "../../types";

export const styles: TStyles = {
  container: {
    display: 'flex',
    backgroundColor:  COLORS.CHOCOLATE,
    color: COLORS.FONT_MAIN,
    borderColor: COLORS.FONT_MAIN,
    fontFamily: 'Consolas, monaco, monospace',
    fontSize: '18px',
    borderRadius: '10px',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
}