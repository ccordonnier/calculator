import './App.css';
import Calculator from './Components/Calculator';
require('./css/calculator.css');

function App() {
  return (
    <div className="App">
      <h1>Welcome to my React Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
