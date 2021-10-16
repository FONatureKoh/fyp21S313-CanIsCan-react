import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const apiDomain = 'http://localhost:5000';            // Use this when testing
// const apiDomain = 'https://api.cancanfoodapp.xyz';    // Use this when deploying

/********************************************
 * All Items Retrieval function             *
 * ******************************************
 * - Takes in restaurantID and retrieve all *
 * menu items based on that restaurant ID   
 * *******************************************/
export function retrieveRestInfo(rest_ID) {
  return axios.get(`${apiDomain}/restaurant/retrieveRestaurantInfo`, {
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