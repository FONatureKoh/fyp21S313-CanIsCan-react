const axios = require('axios');

/********************************************
 * Retrieval function                       *
 * ******************************************
 * - Takes in restaurantID and retrieve all *
 * menu items based on that restaurant ID   
 * *******************************************/

export function retrieveMenuItems(rest_ID) {
  return axios.get('https://api.cancanfoodapp.xyz/restaurant/retrieveMenuItems', {
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