import logo from '../assets/logo.svg';
import './login.css';
import React, { Component, useRef } from 'react';
import { useHistory, withRouter} from 'react-router-dom';

export default function Login() {

  const history = useHistory();
  const username = useRef();
  const password = useRef();

  const RouteChange = ()=>{
    let path = '/custreg';
    history.push(path);
  }

  const login = () => {
    const user = username.current.value;
    const pass = password.current.value;
    if (user === 'abc123' && pass === '123123')
    {
      alert("Welcome "+ user+"!");
      let path = '/gmmenu';
      history.push(path);
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" name="username" ref= { username } placeholder="Username " />
          <input type="password" name="userpw" ref= { password } placeholder="Password"/>
          <select title="select-user">
              <option value="customer">Customer</option>
              <option value="restaurant_admin">Restaurant Manager</option>
              <option value="deliveries">Deliveries Manager</option>
              <option value="reservations">Reservations Manager</option>
              <option value="administrator">Administrator</option>
          </select>
          <button className="go_btn" onClick= { login }>Log In</button>
          <div className="whitefont" >Don't have an account?</div>
          <a className="link" onClick= { RouteChange }>Register</a>
        </header>
      </div>
  )
}
