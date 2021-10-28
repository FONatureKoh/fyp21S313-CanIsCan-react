import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

/*****************************************************************************************
 * For RGM to retrieve all the subusers                                                  *
 * ***************************************************************************************
 * - This retrieves all the subusers based on the rgm's username
 * ***************************************************************************************/
export async function somethingRM() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const res = await axios.get(`${config.apiDomain}/restaurant`, axiosConfig);
  
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};