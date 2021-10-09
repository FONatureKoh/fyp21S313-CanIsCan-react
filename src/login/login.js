import logo from '../assets/logo.svg';
import './login.css';
import React, { useState, useRef } from 'react';
import { useHistory, withRouter} from 'react-router-dom';
import { loginAuth } from './login_controller';
import {Alert} from '@mui/material';

export default function Login() {
 
  const history = useHistory();
  /*Form input*/
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function RouteChange(){
    let path = '/custreg';
    history.push(path);
  }

  /****************************************
   * Test Function to test the loginAuth  *
   * variables returned:
   * - username, user_type
   * NOTE: Current user_types:
   * - "Restaurant General Manager"
   * - "Restaurant Deliveries Manager"
   * - "Restaurant Reservation Manager"
  */
  async function Login(){
    // Await solves the issue of the fulfilled promise
    const userinformation = await loginAuth(username, password);
    console.log(userinformation);
    if (userinformation.length > 0)
    {
      const ut = userinformation[0].user_type;
      const un = userinformation[0].username;

      if(ut === "Restaurant General Manager")
      {
        let path = '/generalmanager';
        history.push(path);
      }
      else
      {
        alert(un + " is a " + ut);
      }
    }
    else
    {
      alert("Invalid credentials! Please try again!");
      setPassword('');
      setUsername('');
    }
  }

  // Original login function below:
  // =======================================================
  // if (username === 'abc123' && password === '123123')
  // {
  //   let path = '/generalmanager';
  //   history.push(path);
  // }
  // else
  // {
  //   alert("Please fill in your username and password!");
  // }
  // ========================================================

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="login_field" type="text" name="username" placeholder="Username " onChange={(e)=>setUsername(e.target.value)}/>
          <input className="login_field" type="password" name="userpw" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <select title="select-user">
              <option value="customer">Customer</option>
              <option value="restaurant_admin">Restaurant Manager</option>
              <option value="deliveries">Deliveries Manager</option>
              <option value="reservations">Reservations Manager</option>
              <option value="administrator">Administrator</option>
          </select>
          <button className="go_btn" onClick= {Login}>Log In</button>
          <div className="whitefont" >Don't have an account?</div>
          <a className="link" onClick= {RouteChange}>Register</a>
        </header>
      </div>
  )
}
