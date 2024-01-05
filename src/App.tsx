import { type FC } from 'react'

import { SerialProvider } from './providers/SerialProvider'

import { StoreProvider } from './providers/StoreProvider'

import { BasicTabs } from './components'

import './App.css'

const App: FC = () =>
<StoreProvider>
  <SerialProvider>
    <BasicTabs/>
  </SerialProvider>
</StoreProvider>

export default App
