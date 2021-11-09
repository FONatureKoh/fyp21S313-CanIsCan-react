import logo from '../assets/logo.svg';
import './resetpassword.css';
import React, { useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { sendResetPassword, verifyUsername } from './login_controller';
import { Backdrop, CircularProgress } from '@mui/material';

export default function ResetPassword() {
  // Constant variables
  const history = useHistory();
  
  // Form input
  const [username, setUsername] = useState('');

  // Backdrop useStates 
  const [backdropState, setBackDropState] = useState(false);

  // Backdrop functions
  const handleBackdropClose = () => {
    setBackDropState(false);
  };

  const handleBackdropOpen = () => {
    setBackDropState(true);
  };

  // Function to handle reset password
  function confirmResetPassword() {
    // VERIFY USERNAME WITH DATABASE
    if (username === "") {
      alert("Username cannot be blank! We need to know who to reset the password for!");
    }
    else {
      // CONTROLLER TO VERIFY USERNAME
      handleBackdropOpen();
      verifyUsername(username)
        .then((response) => {
          if (response.api_msg === "success") {
            // CONTROLLER TO RESET PASSWORD
            sendResetPassword(username)
              .then((response) => {
                if (response.api_msg === "success") {
                  handleBackdropClose();
                  alert("Your password has been successfully reset! Please check your email for further instructions!");
                  history.push("/")
                }
              })
          }
          else {
            handleBackdropClose();
            alert("Username not found! Please try again.");
          }
        })
    }
  }

  function back(){
    let path = "/";
    history.push(path);
  }

  return <>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropState}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <div className="App">
      <header className="App-header">
        <label id="back" onClick= {back}>Back to Login</label>
        <img src={logo} className="App-logo" alt="logo" />
        <label className="text-field">Please key in your username below, and refer to the email you have registered. We will send you a new password!</label>
        <br/>
        <input className="login_field" type="text" name="username" placeholder="Username " onChange={(e)=>setUsername(e.target.value)}/>
        <button className="go_btn" onClick={confirmResetPassword}>Reset Password</button>
      </header>
    </div>
  </>
}
