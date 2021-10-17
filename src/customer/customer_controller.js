import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/********************************************
 * All Items Retrieval function             *
 * ******************************************
 * - Takes in restaurantID and retrieve all *
 * menu items based on that restaurant ID   
 * *******************************************/
export function retrieveRestInfo(rest_ID) {
  return axios.get(`${config.apiDomain}/restaurant/retrieveRestaurantInfo`, {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    params: {
      restaurantID: rest_ID
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
};