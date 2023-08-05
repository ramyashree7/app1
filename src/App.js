import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Validation from "./Validation";
function App() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
 
 const[errors,setErrors]=useState({})
 
  function handleInput(event){
    const newObj={...values,[event.target.name]:event.target.value}
    setValues(newObj)
  }
  function handleValidation(event){
    event.preventDefault();
    setErrors(Validation(values));
  }
  
  
  return (
    <div className="App">
      <form onSubmit={handleValidation}>
        <input
          type="text"
         
    
          name="name"
          placeholder="username"
          onChange={handleInput}
        />
        {errors.name&&<p style={{color:"red"}}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleInput}
        />
 {errors.email&&<p style={{color:"red"}}>{errors.email}</p>}
        <input
        
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInput}
        /> {errors.password&&<p style={{color:"red"}}>{errors.password}</p>}

        <input type="submit" value="Submit" className="submit" />
      </form>
    </div>
  );
}

export default App;
