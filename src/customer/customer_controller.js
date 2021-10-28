import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');


/*****************************************************************************************
 * Retrieve single restaurant information                                                *
******************************************************************************************/
export async function retrieveSingleRestaurant(restID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/singleRestaurantInfo/${restID}`, axiosConfig);
    
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Retrieve all the restaurants based on the user selected category                      *
******************************************************************************************/
export async function getBannerImage(restPngID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    responseType: 'arraybuffer'
  };

  try {
    const response = await axios.get(`${config.apiDomain}/restaurant/restaurantBanner/${restPngID}`, axiosConfig);
    let blob = new Blob(
      [response.data],
      { type: response.headers['content-type'] }
    );
    let image = URL.createObjectURL(blob);
    return image;
  } 
  catch (error) {
    console.log(error);
  }
}

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
export async function retrieveAllRestaurantItems(restID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/allRestaurantItems/${restID}`, axiosConfig);
    console.log(response);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

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

/*****************************************************************************************
 * Retrieve all the restaurants based on the user selected category                      *
******************************************************************************************/
export async function getItemImage(itemPngID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    responseType: 'arraybuffer'
  };

  try {
    const response = await axios.get(`${config.apiDomain}/restaurant/itemImage/${itemPngID}`, axiosConfig);
    let blob = new Blob(
      [response.data],
      { type: response.headers['content-type'] }
    );
    let image = URL.createObjectURL(blob);
    return image;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Retrieve all the restaurants based on the user selected category                      *
******************************************************************************************/
export async function getAllOrders() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/alldeliveryorders`, axiosConfig);
    
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Retrieve all the order items based on the delivery order                              *
******************************************************************************************/
export async function getAllOrderItems(do_ID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/orderitems/${do_ID}`, axiosConfig);
    
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Submits customer's review to the servers                                              *
******************************************************************************************/
export async function submitRestaurantReview(restID, restName, restRating, reviewTitle, reviewDesc) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const reviewJson = {
    restID: restID,
    restName: restName,
    restRating: restRating,
    reviewTitle: reviewTitle,
    reviewDesc: reviewDesc
  } 

  try {
    const response = await axios.post(`${config.apiDomain}/customer/submitreview`, reviewJson, axiosConfig);
    
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Submits customer Orders                                                               *
******************************************************************************************/
export async function submitCustOrder(restInfo, realCart, deliveryAddress, deliveryFloorUnit, 
  deliveryPostalCode, companyName, noteToDriver, cardName, cardNumber, expiry, cvc, 
  subtotal, gst, deliveryFee, total) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  console.log(restInfo);


  let formParams = new URLSearchParams();

  // Order stuff
  formParams.append('restID', restInfo.restaurant_ID);
  formParams.append('restName', restInfo.restaurant_name);
  formParams.append('orderDateTime', new Date());
  formParams.append('address', deliveryAddress);
  formParams.append('floorunit', deliveryFloorUnit);
  formParams.append('postalCode', deliveryPostalCode);
  formParams.append('companyName', companyName);
  formParams.append('deliveryNote', noteToDriver);
  formParams.append('totalCost', total);
  formParams.append('orderItems', realCart);
  
  // Payment stuff
  formParams.append('cardName', cardName);
  formParams.append('cardNumber', cardNumber);
  formParams.append('expiry', expiry);
  formParams.append('cvc', cvc);

  // const reviewJson = {
  //   restID: restID,
  //   restName: restName,
  //   restRating: restRating,
  //   reviewTitle: reviewTitle,
  //   reviewDesc: reviewDesc
  // } 

  try {
    const response = await axios.post(`${config.apiDomain}/customer/submitorder`, formParams, axiosConfig);
    
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Submits customer Orders                                                               *
 ****************************************************************************************
 * Gets the slots available based on the date and the restaurantID 
 */
export async function getAvailableSlots (restID, selectedDate) {
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/availableslots/${restID}/${selectedDate}`, axiosConfig)

    return response.data;
  }
  catch (error) {
    console.log(error);
  }

}