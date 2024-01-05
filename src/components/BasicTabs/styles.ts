import { COLORS } from '../../theme/colors'

import { type TStyles } from '../../types'

export const styles: TStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND_SECONDARY
  },
  tabButton: {
    color: COLORS.FONT_MAIN
  },
  tabContainer: {
    width: '100vw',
    height: '92vh'
  },
  tabIndicator: {
    backgroundColor: COLORS.PRIMARY
  }
}
