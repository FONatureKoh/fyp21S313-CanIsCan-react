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