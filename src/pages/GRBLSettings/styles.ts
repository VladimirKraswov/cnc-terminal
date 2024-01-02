import { COLORS } from "../../theme/colors";

import { TStyles } from "../../types";

export const styles: TStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_MAIN,
    justifyContent: 'center',
  },
  notConnectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}