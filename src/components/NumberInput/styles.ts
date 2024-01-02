import {numberInputClasses} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

import { COLORS } from "../../theme/colors";

import { TStyles } from "../../types";

export const styles: TStyles = {
  container: {
    backgroundColor:  COLORS.CHOCOLATE,
    color: COLORS.FONT_MAIN,
    borderColor: COLORS.FONT_MAIN,
    fontFamily: 'Consolas, monaco, monospace',
    fontSize: '18px',
    borderRadius: '10px',
    padding: '1rem',
  },
}

export const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  background: ${COLORS.BACKGROUND_SECONDARY};
  border: 1px solid ${COLORS.BORDER};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${COLORS.BORDER_MOUSE_MOVE};
    box-shadow: 0 0 0 3px ${COLORS.BORDER_FOCUS};
  }

  &:hover {
    border-color: ${COLORS.BORDER_MOUSE_MOVE};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${COLORS.FONT_MAIN};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

export const StyledButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${COLORS.BACKGROUND_SECONDARY};
  border: 0;
  color: ${COLORS.CHOCOLATE};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${COLORS.BACKGROUND_SECONDARY};
    border-color: ${COLORS.BACKGROUND_SECONDARY};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${COLORS.GOLD};
    background: ${COLORS.GOLD};
    color: ${COLORS.BACKGROUND_SECONDARY};

    &:hover {
      cursor: pointer;
      color:${COLORS.FONT_MAIN};
      background: ${COLORS.DARK_ORANGE};
      border-color: ${COLORS.DARK_ORANGE};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${COLORS.GOLD};
    background: ${COLORS.GOLD};
    color: ${COLORS.BACKGROUND_SECONDARY};
  }

  &:hover {
    cursor: pointer;
    color:${COLORS.FONT_MAIN};
    background: ${COLORS.DARK_ORANGE};
    border-color: ${COLORS.DARK_ORANGE};
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);