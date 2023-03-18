import './App.css';
import Start from './components/start';
import { Routes, Route } from 'react-router-dom';
import Saper from "./components/saper";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Start></Start>} />
          <Route path='/game' element={<Saper/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
