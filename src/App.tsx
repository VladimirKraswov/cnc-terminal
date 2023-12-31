import { SerialProvider } from "./providers/SerialProvider"
import { CommandLine } from "./screens";

import './App.css';
import { JogBlock, MainMenu, RealtimeCommandsBlock } from "./components";
import { Route, Routes } from "react-router-dom";

const App = () => 
  <SerialProvider>
    <MainMenu style={{ position: 'absolute' }}>
      <div style={{ width: '1024px', height: '600px' }}>
        <CommandLine />
        <JogBlock />
        <RealtimeCommandsBlock />
      </div>
    </MainMenu>
  </SerialProvider>
  

export default App;
