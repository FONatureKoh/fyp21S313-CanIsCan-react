const axios = require('axios');

/********************************************
 * All Items Retrieval function             *
 * ******************************************
 * - Takes in restaurantID and retrieve all *
 * menu items based on that restaurant ID   
 * *******************************************/
export function retrieveRestInfo(rest_ID) {
  return axios.get('https://api.cancanfoodapp.xyz/restaurant/retrieveRestaurantInfo', {
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