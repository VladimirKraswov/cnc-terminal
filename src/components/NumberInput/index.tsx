import {ReactNode, forwardRef} from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { Box } from '@mui/system';
import { Text } from '../Text';
import { StyledButton, StyledInputElement, StyledInputRoot } from './styles';

interface INumberInputProps extends NumberInputProps {
  label?: string
  renderRightElement?: () => ReactNode | null
}

export const NumberInput = forwardRef<HTMLDivElement, INumberInputProps>(({label, renderRightElement, ...rest}, ref) => (
    <Box width="100%" flexDirection="column">
      {!!label && (
        <Text style={{
          marginBottom: '10px',
          marginTop: '10px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }} variant="caption" value={label}/>
      )}
      <Box  >
        <BaseNumberInput
          style={{ width: '100%' }}
          slots={{
            root: StyledInputRoot,
            input: StyledInputElement,
            incrementButton: StyledButton,
            decrementButton: StyledButton,
          }}
          slotProps={{
            incrementButton: {
              children: '▴',
            },
            decrementButton: {
              children: '▾',
            },
          }}
          {...rest}
          ref={ref}
        />
        {!!renderRightElement && (
          <Box ml={1}>
            {renderRightElement()}
          </Box>
        )}
      </Box>
    </Box>
  ))

  NumberInput.displayName = 'NumberInput'