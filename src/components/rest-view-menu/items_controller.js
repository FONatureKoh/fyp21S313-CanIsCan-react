import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

/*****************************************************************************************
 * Retrieve image function                                                               *
******************************************************************************************
 * - Takes in itemPngID and then fetches the image in form of image/png 
 */

export function getImage(itemPngID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    responseType: 'arraybuffer'
  };

  return axios.get(`${config.apiDomain}/restaurant/itemImage/${itemPngID}`, axiosConfig)
    .then(response => {
      let blob = new Blob(
        [response.data], 
        { type: response.headers['content-type'] }
      )
      let image = URL.createObjectURL(blob);

      return image;
    })
    .catch(function (error) {
      console.log(error);
    })
}