import axios from 'axios';
import React, { useContext, useState } from 'react';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

/*****************************************************************************************
 * Retrieve image function                                                               *
******************************************************************************************
 * - Should take in username and password
 * - Should return success and user type 
 * 
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

      console.log(image);
      
      return image;
    })
    .catch(function (error) {
      console.log(error);
    })
}