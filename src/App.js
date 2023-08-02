import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Example from './components/Example'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"



function App() {
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <Sidebar />
        </div>
        <div className="col-auto">
         <Example/>
        </div>
      </div>
    </div>
  );
}

export default App;
