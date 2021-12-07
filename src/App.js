import React, {useEffect, useContext, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import {AuthContext, FirebaseContext } from './store/FirebaseContext'
import './App.css';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const [category, setcategory] = useState('All');
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      
        <Router>
          <Route exact path='/'>
            <Home cat = {category} setcat = {setcategory} /> 
          </Route>
          <Route exact path='/signup'>
            <Signup /> 
          </Route>
          <Route exact path='/login'>
            <Login /> 
          </Route>
          <Route exact path='/create'>
            <Create /> 
          </Route>
        </Router>
    </div>
  );
}

export default App;
