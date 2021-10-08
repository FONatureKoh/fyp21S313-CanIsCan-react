const axios = require('axios');

/********************************************
 * Retrieval function                       *
 * ******************************************
 * - Takes in restaurantID and retrieve all *
 * menu items based on that restaurant ID   
 * *******************************************/

export function retrieveMenuItems(rest_ID) {
  axios.get('https://api.cancanfoodapp.xyz/restaurant/retrieveMenuItems', {
    params: {
      restaurantID: 1
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
};