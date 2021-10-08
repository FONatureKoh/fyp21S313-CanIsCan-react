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

  axios.post('http://localhost:5000/auth/login', loginCreditials)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
}