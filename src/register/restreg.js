import logo from '../assets/logo.svg';
import './restreg.css';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default function RestRegister() {
  const history = useHistory();
  const username = useRef();
  const uen_num = useRef();
  const email = useRef();

  function back(){
    let path = "/";
    history.push(path);
  }

  function register(){
    const user = username.current.value;
    const uen = uen_num.current.value;
    const mail = email.current.value;

    if (user === "" || uen === "" || mail === "")
    {
      alert("Please fill in the fields!");
    }
    else
    {
      alert("Arigato!");
      back();
    }
  }

  return (
    <div className="App">
        <header className="App-header">
          <a id="back" onClick= {back}>Back to Login</a>
          <img src={logo} className="App-logo" alt="logo" />
          <a class="whitefont" id="register">Restaurant Registration</a> 
          <input className="rr_field" type="text" name="username" placeholder="Restaurant Name " ref= {username} />
          <input className="rr_field" type="text" name="uen" placeholder="Restaurant Business UEN " ref= {uen_num} />
          <input className="rr_field" type="text" name="email" placeholder="Restaurant Email" ref= {email} />
          <button className="go_btn" onClick= {register} >Register</button>
          <div className="whitefont">Registering for business account <br/>takes up to 7 days for approval</div>
        </header>
      </div>
  )
}
