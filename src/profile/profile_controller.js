import axios from 'axios'

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const apiDomain = 'http://localhost:5000';            // Use this when testing
// const apiDomain = 'https://api.cancanfoodapp.xyz';    // Use this when deploying

/*****************************************************************************************
 * User retrieving profile information based on the usertype                             *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export function retrieveUserProfile() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  console.log(axiosConfig);

  return axios.get(`${apiDomain}/users/profilemanagement`, axiosConfig)
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

/*****************************************************************************************
 * User password change                                                                  *
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export function changePwController(oldPassword, newPassword) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  console.log(axiosConfig);

  return axios.put(`${apiDomain}/users/profilemanagement`, axiosConfig)
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

/*****************************************************************************************
 * User password change                                                                  *
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export function verifyPwController(oldPassword) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  // Create simple form data
  const verifyJSON = { oldPassword: oldPassword };

  return axios.post(`${apiDomain}/users/userpassword`, verifyJSON, axiosConfig)
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