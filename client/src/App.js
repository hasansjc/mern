import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import {Route,Switch} from "react-router-dom";
import React,{ createContext,useReducer,useEffect } from 'react';
import Footer from './Footer';
const UserContext = createContext()
const initialState =false;
const reducer = (state,action) =>{
    if(action.type==='USERss'){
        return action.payload;
    }
        return state;
} 


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>

    <Navbar/>
     <Switch>
     <Route exact path="/"> <Home/> </Route>
      <Route exact path="/Contact"> <Contact/> </Route>
      <Route exact path="/About"> <About/> </Route>
      <Route exact path="/Signin"> <Signin/> </Route>
      <Route exact path="/Signup"> <Signup/> </Route>
      <Route exact path="/Logout"> <Logout/> </Route>
     </Switch>

      <Footer/>
      
    </UserContext.Provider>
   
    </>
  );
}

export default App;
export{UserContext};
