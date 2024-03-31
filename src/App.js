import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';



function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(()=>{
      setAlert(null);
    },2000)
  }

  return (
  <>
  <NoteState>
  <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/about" element={<About/>}>
          </Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
          </Route>
      </Routes>
  </Router>
  </NoteState>
  </>
  );
}

export default App;
