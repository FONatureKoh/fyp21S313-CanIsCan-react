import logo from '../assets/logo.svg';
import './custreg.css';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default function CustRegister() {

  const history = useHistory();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  function Register(){
    const user = username.current.value;
    const pass = password.current.value;
    const mail = email.current.value;

    if (user === "" || pass === "" || mail === "")
    {
      alert("Please fill in the fields!");
    }
    else
    {
      alert("Arigato!");
      back();
    }
  }

  function back(){
    let path = "/";
    history.push(path);
  }

  function restreg(){
    let path = "/restreg";
    history.push(path);
  }

  return (
    <div className="App">
        <header className="App-header">
          <a id="back" onClick= {back}>Back to Login</a>
          <img src={logo} className="App-logo" alt="logo" />
          <a class="whitefont" id="register">Create an account</a> 
          <input className="cr_field" type="text" name="username" placeholder="Username " ref= {username}/>
          <input className="cr_field"type="text" name="email" placeholder="Email "  ref= {email}/>
          <input className="cr_field" type="password" name="userpw" placeholder="Password" ref= {password} />
          <button className="go_btn" onClick= {Register} >Register</button>
          <div className="whitefont">Restaurant User?</div>
          <a className="link" onClick= {restreg}>Restaurant Register</a>
        </header>
      </div>
  )
}