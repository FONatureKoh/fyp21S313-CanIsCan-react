import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Retrieve all restaurants from the system                                              *
******************************************************************************************/
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

/*****************************************************************************************
 * Retrieve all the restaurant tags                                                      *
******************************************************************************************/
export async function retrieveRestaurantTags() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/restaurant/tags`, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
};

/*****************************************************************************************
 * Retrieve all the restaurants based on the user selected category                      *
******************************************************************************************/
export async function getCategoryRestaurant(tag) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/selectedRestaurantInfo/${tag}`, axiosConfig);
    console.log(response);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}