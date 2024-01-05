import { SerialProvider } from './providers/SerialProvider'

import { StoreProvider } from './providers/StoreProvider'

import { BasicTabs } from './components'

import './App.css'

const App = () =>
<StoreProvider>
  <SerialProvider>
    <BasicTabs/>
  </SerialProvider>
</StoreProvider>

export default App
