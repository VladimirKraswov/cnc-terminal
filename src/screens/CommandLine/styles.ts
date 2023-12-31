import { COLORS } from "../../theme/colors";

import { TStyles } from "../../types";

export const styles: TStyles = {
  container: {
    width: '100vw',
    height: '100vh',
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND_MAIN,
    padding: '1rem',
  },
  terminalAreaContainer: {
    flex: 1,
  }
}