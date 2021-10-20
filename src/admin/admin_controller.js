import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function retrievePending (username, restaurat_name, email, phone) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/pending`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}