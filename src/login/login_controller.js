import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * VERIFY USERNAME WITH DATABASE
******************************************************************************************
 * - Should take in username
 */

export async function verifyUsername (username) {
  try {
    const response = await axios.get(`${config.apiDomain}/register/verifyusername/${username}`);

    return response.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Reset Password Controller
******************************************************************************************
 * - Should take in username
 */

export async function sendResetPassword (username) {
  try {
    const response = await axios.get(`${config.apiDomain}/register/resetpassword/${username}`);

    return response.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Login Auth function                                                                   *
******************************************************************************************
 * - Should take in username and password
 * - Should return success and user type 
 * 
 */

export function loginAuth (username, password) {
  return axios.post(`${config.apiDomain}/auth/login`, {
      username: username,
      password: password
    })
    .then(response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (err) {
      console.log(err);
    })
}

/*****************************************************************************************
 * User retrieving profile information based on the usertype                             *
 * ***************************************************************************************
 * - This finds the user based on username
 * ***************************************************************************************/
export function retrieveUserProfile() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  console.log(axiosConfig);

  return axios.get(`${config.apiDomain}/users/profilemanagement`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};