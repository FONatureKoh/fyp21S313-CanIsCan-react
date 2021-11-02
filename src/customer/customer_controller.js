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
 * Retrieve restaurant reviews
******************************************************************************************/
export async function getRestReviews(restID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/restaurantreivew/${restID}`, axiosConfig);
    
    console.log (response);
    return response.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Customer checkout to trigger payment                                                  *
******************************************************************************************/
export async function customerCheckout(token, doID, totalCost) {
  // Axios request config to be declared first
  console.log("CustomerCheckout triggered")
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  // Parameters to send
  const paymentJSON = {
    token, doID, totalCost
  }

  try {
    const response = await axios.post(`${config.apiDomain}/customer/checkout`, paymentJSON, axiosConfig);

    return response.data;
  }
  catch(error) {
    return error;
  }
}


/*****************************************************************************************
 * Submits customer Orders                                                               *
******************************************************************************************/
export async function submitCustOrder(doID, restInfo, realCart, deliveryAddress, deliveryFloorUnit, 
  deliveryPostalCode, companyName, noteToDriver, subtotal, gst, deliveryFee, total) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  console.log(restInfo);
  console.log(realCart);

  let formParams = new URLSearchParams();

  // Construct Restaurant's Address
  const restAddress = restInfo.rest_address_info + ", Singapore " + restInfo.rest_postal_code;

  // Order stuff
  formParams.append('doID', doID)
  formParams.append('restID', restInfo.restaurant_ID);
  formParams.append('restName', restInfo.restaurant_name);
  formParams.append('restEmail', restInfo.rest_email);
  formParams.append('orderDateTime', new Date());
  formParams.append('address', deliveryAddress);
  formParams.append('floorunit', deliveryFloorUnit);
  formParams.append('postalCode', deliveryPostalCode);
  formParams.append('companyName', companyName);
  formParams.append('deliveryNote', noteToDriver);
  formParams.append('totalCost', total);
  formParams.append('restAddress', restAddress);
  // formParams.append('orderItems', JSON.stringify(realCart[0]));

  // For order items (realcart) we will need to stringify each item so that it can be sent through
  // the form
  for (var x in realCart) {
    formParams.append("orderItems", JSON.stringify(realCart[x]));
  }
  
  // Payment stuff
  // formParams.append('cardName', cardName);
  // formParams.append('cardNumber', cardNumber);
  // formParams.append('expiry', expiry);
  // formParams.append('cvc', cvc);

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
 * Verify the customer's delivery address                                                *
 *****************************************************************************************
 * Gets the slots available based on the date and the restaurantID 
 */
export async function verifyAdd (custAddress) {
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    const response = await axios.get(`${config.apiDomain}/customer/verifyCustAddress/${custAddress}`, axiosConfig);

    return response;
  }
  catch (err) {
    return err;
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