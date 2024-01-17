import logo from './logo.svg';
import './App.css';
import transactionTracker from './transactionTracker'
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <Dashboard/> */}
      <transactionTracker/>
    </div>
  );
}

export default App;
