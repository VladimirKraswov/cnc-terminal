import { type FC } from 'react'

import { Box } from '@mui/system'
import { PortConnector, TerminalArea } from '../../components'

import { styles } from './styles'

export const CommandLine: FC = () => (
    <Box style={styles.container}>
      <PortConnector />
      <Box height={5}/>
      <TerminalArea/>
    </Box>
)
