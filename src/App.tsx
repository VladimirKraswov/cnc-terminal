import { SerialProvider } from "./providers/SerialProvider"
import { CommandLine } from "./screens";

import './App.css';

const App = () => 
  <SerialProvider>
    <CommandLine />
  </SerialProvider>
  

export default App;
