const axios = require('axios');

/********************************************
 * Login Auth function                      *
 * ******************************************
 * - Should take in username and password
 * - Should return success and user type */

export function loginAuth (username, password) {
  var loginCreditials = {
    username: username,
    password: password
  }

  return axios.post('https://api.cancanfoodapp.xyz/auth/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

}