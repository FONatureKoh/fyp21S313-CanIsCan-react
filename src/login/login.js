import logo from '../assets/logo.svg';
import './login.css';
import React, { useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { loginAuth } from './login_controller';
import { UserContext } from '../store/user_context';
import { retrieveUserProfile } from '../profile/profile_controller';

export default function Login() {
  // Constant variables
  const history = useHistory();
  
  // Form input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Some useful variable
  var path = "";

  // Pull the userContext
  const userContext = useContext(UserContext);
  
  function RouteChange(){
    path = "/custreg";
    history.push(path);
  }

  // Async function 
  async function loginControl(){
    // Try catch to do something when userInfo is received
    try {
      const userInfo = await loginAuth(username, password);

      if (userInfo != null) {
        // Set accesstoken to session
        window.sessionStorage.setItem("accessToken", userInfo["accessToken"]);

        // Save usertype to the userContext as well
        userContext.usertype[1](userInfo.userType);        

        // Now that all that is done, then we get and return the user profile
        const userProfile = await retrieveUserProfile();
        return userProfile;
      }
      else {
        return userInfo.api_msg;
      }
    }
    catch (error) {
      return error;
    }
  }

  // Function to handle login onClick
  function clickLogin() {
    loginControl()
      .then((response) => {
        // Declare the default userType
        var userType = "";

        // If there's a proper response, then proceed
        if (response != null) {
          // Set a full name to the userContext
          userContext.userFullName[1](response.first_name + " " + response.last_name);
          userType = response.userType;
        }          

        switch (userType) {
          case "Restaurant General Manager":
            path = "/generalmanager";
            history.push(path);
            break; 
          case "Restaurant Deliveries Manager":
            path = "/deliveriesmanager";
            history.push(path);
            break;
          case "Restaurant Reservations Manager":
            path = "/reservationsmanager";
            history.push(path);
            break;
          case "Customer":
            path = "/customer";
            history.push(path);
            break;
          case "System Administrator":
            path = "/admin";
            history.push(path);
            break;
          default:
            alert("Invalid credentials! Please try again!");
        }
      })
      .catch(err => console.log("Login Error: " + err));
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="login_field" type="text" name="username" placeholder="Username " onChange={(e)=>setUsername(e.target.value)}/>
          <input className="login_field" type="password" name="userpw" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          
          <button className="go_btn" onClick= {clickLogin}>Log In</button>
          <div className="whitefont" >Don't have an account?</div>
          <a className="link" onClick= {RouteChange}>Register</a>
        </header>
      </div>
  )
}
