import { type FC, useCallback, useState } from 'react'
import { Select, MenuItem, Box } from '@mui/material'
import { useSerial } from '../../providers/SerialProvider'
import { getEnding } from '../../providers/SerialProvider/utils/serial'
import { Text } from '../Text'
import { ImageButton } from '../ImageButton'
import { ConnectIcon, DisconnectIcon, RefreshIcon } from '../../assets/images'
import { styles } from './styles'

export const PortConnector: FC = () => {
  const [selectPort, setSelectPort] = useState<string | null>(null)

  const { isConnected, ports, connect, disconnect, getSerialPorts } = useSerial()

  const handleChangePort = useCallback((event: { target: { value: string | null, name: string } }) => {
    const selectedPort = event.target.value
    setSelectPort(selectedPort)
  }, [])

  const handleConnect: () => Promise<void> = useCallback(async () => {
    if (selectPort == null) {
      return
    }

    if (isConnected) {
      disconnect()
    } else {
      await connect(selectPort, '115200', getEnding()[1])
    }
  }, [selectPort, isConnected, connect, disconnect])

  return (
    <div style={styles.container}>
      <Select
        style={styles.selectContainer}
        displayEmpty
        value={selectPort}
        onChange={handleChangePort}
        renderValue={
          (selectPort != null) ? undefined : () => <Text style={{ fontSize: 24 }} value={'Select serial port'} />
        }
      >
        {ports.map((port) => (
          <MenuItem
            style={{ fontFamily: 'Consolas, monaco, monospace' }}
            key={port}
            value={port}
          >
            {port}
          </MenuItem>
        ))}
      </Select>
      <Box width={5} />
      <ImageButton src={RefreshIcon} hint="" onPress={getSerialPorts} />
      <Box width={5} />
      <ImageButton src={isConnected ? DisconnectIcon : ConnectIcon} hint="" onPress={handleConnect} />
      <Box width={5} />
    </div>
  )
}
