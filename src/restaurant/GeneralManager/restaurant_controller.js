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

  axios.post('/auth/login', loginCreditials)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}