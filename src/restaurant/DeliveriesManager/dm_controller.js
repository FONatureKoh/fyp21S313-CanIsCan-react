import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

/*****************************************************************************************
 * For DM to get all the pending delivery order                                          *
 * ***************************************************************************************
 * - This retrieves all pending delivery orders, based on the subuser name
 * ***************************************************************************************/
export async function getOrders(getMode) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  var requestPath = "";

  switch(getMode){
    case 1:
      requestPath = "pendingdeliveryorders";
      break;
    
    case 2:
      requestPath = "ongoingdeliveryorders";
      break;
    
    case 3:
      requestPath = "fulfilledorders";
      break;
    
    default:
      break;
  }

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/${requestPath}`, axiosConfig);
  
    // console.log(response);
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For DM to get all the pending DO items                                                *
 * ***************************************************************************************
 * - This retrieves all the items from the delivery order
 * ***************************************************************************************/
export async function getDOItems(orderID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/doitems/${orderID}`, axiosConfig);
  
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For DM to update order status                                                         *
 * ***************************************************************************************
 * - This retrieves all the items from the delivery order
 * ***************************************************************************************/
export async function updateDOStatus(orderID, orderStatus) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/updateorderstatus/${orderID}/${orderStatus}`, axiosConfig);
  
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
};