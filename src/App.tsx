import { SerialProvider } from "./providers/SerialProvider"
import { CommandLine } from "./screens";

import './App.css';
import { JogBlock } from "./components";

const App = () => 
  <SerialProvider>
    <CommandLine />
    <JogBlock />
  </SerialProvider>
  

export default App;
