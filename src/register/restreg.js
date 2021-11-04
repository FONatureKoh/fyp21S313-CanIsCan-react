import logo from '../assets/logo.svg';
import './restreg.css';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { restaurantRegister } from './register_controller';

export default function RestRegister() {
  const history = useHistory();
  const restaurant_name = useRef();
  const username = useRef();
  const restaurant_phone_no = useRef();
  const email = useRef();

  async function sendRestRegister(username, restaurant_name, email, restaurant_phone_no) {
    try {
      const response = await restaurantRegister(username, restaurant_name, email, restaurant_phone_no);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  function back(){
    let path = "/";
    history.push(path);
  }

  function register() {
    const rest_name = restaurant_name.current.value;
    const user = username.current.value;
    const phone_no = restaurant_phone_no.current.value;
    const mail = email.current.value;

    if (rest_name === "" || user === "" || phone_no === "" || mail === "") {
      alert("Please fill in the fields!");
    }
    else {
      sendRestRegister(user, rest_name, mail, phone_no)
        .then(response => {
          if (response == "Successful") {
            var alertMsg = "Your restaurant register is successful! Please wait a few days for approval! ";
            alertMsg += "You will receive an email with a default password and the username you registered with for login!";

            alert(alertMsg);
            back();
          }
          else {
            alert(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <div className="App">
        <header className="App-header">
          <a id="back" onClick= {back}>Back to Login</a>
          <img src={logo} className="App-logo" alt="logo" />
          <a class="whitefont" id="register">Restaurant Registration</a> 
          <input className="rr_field" type="text" name="restaurant_name" placeholder="Restaurant Name " ref= {restaurant_name} />
          <input className="rr_field" type="text" name="username" placeholder="Username " ref= {username} />
          <input className="rr_field" type="number" name="phone" placeholder="Restaurant Phone Number " ref= {restaurant_phone_no} />
          <input className="rr_field" type="email" name="email" placeholder="Restaurant Email" ref= {email} />
          <button className="go_btn" onClick= {register} >Register</button>
          <div className="whitefont">Registering for business account <br/>takes up to 7 days for approval</div>
        </header>
      </div>
  )
}
