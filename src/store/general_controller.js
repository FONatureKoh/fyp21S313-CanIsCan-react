import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Retrieve usertype based on Token                                                      *
******************************************************************************************/
export async function getUserType() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/users/usertype`, axiosConfig);
    
    return response.data;
  } 
  catch (err) {
    console.log(err);
    return err;
  }
}

/*****************************************************************************************
 * Password change
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export async function postChangePW(oldPassword, newPassword) {
  // Test consoles
  // console.log("changePwController");
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const changeJSON = { 
    oldPassword: oldPassword,
    newPassword: newPassword
   };

  try {
    const res = await axios.put(`${config.apiDomain}/users/userpassword`, changeJSON, axiosConfig);
    // In here we can choose what we want to do with the response of the request
    // console.log(res)
    // console.log(res.data);
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Password change
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export async function updateAccStatus() {
  // Test consoles
  // console.log("changePwController");
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const changeJSON = { 
    accStatus: "active"
  };

  try {
    const res = await axios.put(`${config.apiDomain}/users/accountstatus`, changeJSON, axiosConfig);
    // In here we can choose what we want to do with the response of the request
    // console.log(res)
    // console.log(res.data);
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For DM / RM to get App user acount status
 * ***************************************************************************************
 * - This gets the DM's account status
 * ***************************************************************************************/
export async function getAccStatus() {
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  }

  try {
    const response = await axios.get(`${config.apiDomain}/users/accountstatus`, axiosConfig);

    return response.data;
  }
  catch (err) {
    return err;
  }
}