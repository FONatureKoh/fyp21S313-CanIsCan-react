import logo from '../assets/logo.svg';
import './login.css';
import React, { Component, useRef } from 'react';
import { useHistory, withRouter} from 'react-router-dom';
import { loginAuth } from './login_controller';

export default function Login() {
 
  const history = useHistory();
  const username = useRef();
  const password = useRef();

  function RouteChange(){
    let path = '/custreg';
    history.push(path);
  }

  function login(){
    const user = username.current.value;
    const pass = password.current.value;

    // Test login function
    loginAuth(user, pass);

    if (user === 'abc123' && pass === '123123')
    {
      let path = '/generalmanager';
      history.push(path);
    }
    else
    {
      alert("Please fill in your username and password!");
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="login_field" type="text" name="username" ref= { username } placeholder="Username " />
          <input className="login_field" type="password" name="userpw" ref= { password } placeholder="Password"/>
          <select title="select-user">
              <option value="customer">Customer</option>
              <option value="restaurant_admin">Restaurant Manager</option>
              <option value="deliveries">Deliveries Manager</option>
              <option value="reservations">Reservations Manager</option>
              <option value="administrator">Administrator</option>
          </select>
          <button className="go_btn" onClick= {login}>Log In</button>
          <div className="whitefont" >Don't have an account?</div>
          <a className="link" onClick= {RouteChange}>Register</a>
        </header>
      </div>
  )
}
