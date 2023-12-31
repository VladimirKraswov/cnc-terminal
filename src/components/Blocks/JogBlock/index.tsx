import {FC, memo} from "react";

import  {styles} from './styles'
interface IMainButtonProps {
  style?: any
}

export const JogBlock: FC<IMainButtonProps> = memo(({style}) => (
    <div style={{ ...styles.container, ...style }}>

    </div>
  ))

  JogBlock.displayName = 'JogBlock';