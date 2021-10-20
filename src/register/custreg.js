import logo from '../assets/logo.svg';
import './custreg.css';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { customerRegister } from './register_controller';

export default function CustRegister() {

  const history = useHistory();
  const username = useRef();
  const email = useRef();
  const password = useRef();

  async function sendCustRegister(username, password, email) {
    try {
      const response = await customerRegister(username, password, email);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  function Register(){
    const user = username.current.value;
    const pass = password.current.value;
    const mail = email.current.value;

    if (user === "" || pass === "" || mail === "") {
      alert("Please fill in the fields!");
    }
    else {
      sendCustRegister(user, pass, mail)
        .then(api_msg => {
          if (api_msg == "Successful") {
            alert("Your account is successfully registered!");
            back();
          }
        })
        .catch (error => {
          console.log(error);
        });
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
          <input className="cr_field" type="password" name="userpw" placeholder="Password" ref= {password} />
          <input className="cr_field"type="text" name="email" placeholder="Email "  ref= {email}/>
          <button className="go_btn" onClick= {Register} >Register</button>
          <div className="whitefont">Want to register your restaurant instead? Click below!</div>
          <a className="link" onClick= {restreg}>Restaurant Register</a>
        </header>
      </div>
  )
}