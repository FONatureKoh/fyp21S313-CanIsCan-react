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
export async function retrieveAllRestaurants() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/allRestaurantInfo`, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
};