import { COLORS } from '../../theme/colors'

import { type TStyles } from '../../types'

export const styles: TStyles = {
  container: {
    display: 'flex',
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.FONT_SECONDARY,
    borderColor: COLORS.FONT_SECONDARY,
    fontFamily: 'Consolas, monaco, monospace',
    fontSize: '18px',
    borderRadius: '10px',
    padding: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
