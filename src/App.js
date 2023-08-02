import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Registration from './components/Registration';

function App() {
  return (
    <div className="App">
      <Header/>
      <Registration/>
    </div>
  );
}

export default App;
