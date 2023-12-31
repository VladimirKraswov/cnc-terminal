import { SerialProvider } from "./providers/SerialProvider"
import { CommandLine } from "./screens";

import './App.css';
import { JogBlock, RealtimeCommandsBlock } from "./components";

const App = () => 
  <SerialProvider>
    <CommandLine />
    <JogBlock />
    <RealtimeCommandsBlock />
  </SerialProvider>
  

export default App;
