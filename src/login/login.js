import logo from '../assets/logo.svg';
import './login.css';
import React, { useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { loginAuth } from './login_controller';
import { Alert } from '@mui/material';
import { UserContext } from '../store/user_context';
import { retrieveUserProfile } from '../profile/profile_controller';

export default function Login() {
 
  const history = useHistory();
  /* Form input */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Pull the userContext
  const userContext = useContext(UserContext);
  
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
   * - "Customer"
  */

  async function Login(){
    // Await solves the issue of the fulfilled promise
    const userinformation = await loginAuth(username, password);

    const userProfile = await retrieveUserProfile();
    if (userProfile) {
      userContext.userFullName[1](userProfile.first_name + " " + userProfile.last_name)
    }
    console.log(userinformation);

    // console.log(userContext.username[1]);
    // userContext.username[1](userinformation[0].username);
    // userContext.usertype[1](userinformation[0].user_type);
    // userContext.username.setUserName(userinformation[0].username);
    // setUserType(userinformation[0].user_type);

    if (userinformation != null) {
      // If there's userinformation, we can proceed with the login
      window.sessionStorage.setItem('accessToken', userinformation["accessToken"]);

      const ut = userinformation["userType"];
      console.log(ut);
      // const un = userinformation[0].username;

      if(ut === "Restaurant General Manager")
      {
        let path = '/generalmanager';
        history.push(path);
      }
      else if(ut === "Restaurant Deliveries Manager")
      {
        let path = '/deliveriesmanager';
        history.push(path);
      }
      else if(ut === "Restaurant Reservation Manager")
      {
        let path = '/reservationsmanager';
        history.push(path);
      }
      else if(ut === 'Customer')
      {
        let path = '/customer';
        history.push(path);
      }
      else // Assuming nothing else, then System Administrator
      {
        let path = '/admin';
        history.push(path);
        // alert(un + " is a " + ut);
      }
    }
    else {
      //place holder for now
      alert("Invalid credentials! Please try again!");
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input className="login_field" type="text" name="username" placeholder="Username " onChange={(e)=>setUsername(e.target.value)}/>
          <input className="login_field" type="password" name="userpw" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          
          <button className="go_btn" onClick= {Login}>Log In</button>
          <div className="whitefont" >Don't have an account?</div>
          <a className="link" onClick= {RouteChange}>Register</a>
        </header>
      </div>
  )
}
