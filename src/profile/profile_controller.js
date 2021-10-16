import axios from 'axios'

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

  return axios.get(`http://localhost:5000/users/profilemanagement`, axiosConfig)
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