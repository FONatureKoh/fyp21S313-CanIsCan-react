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
export async function getReservations(getMode) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  var requestPath = "";

  switch(getMode){
    case 1:
      requestPath = "pendingreservations";
      break;
    
    case 2:
      requestPath = "ongoingreservations";
      break;
    
  }

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/${requestPath}`, axiosConfig);
  
    return response.data;
  }
  catch (err) {
    console.log(err);
    return err;
  }
};

/*****************************************************************************************
 * For DM to update order status                                                         *
 * ***************************************************************************************
 * - This retrieves all the items from the delivery order
 * ***************************************************************************************/
export async function updateReservationStatus(reservationID, reservationStatus) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/updatereservationstatus/${reservationID}/${reservationStatus}`, axiosConfig);
  
    return response.data;
  }
  catch (err) {
    console.log(err);
    return err;
  }
};

/*****************************************************************************************
 * For DM to update order status                                                         *
 * ***************************************************************************************
 * - This retrieves all the items from the delivery order
 * ***************************************************************************************/
export async function updatePOStatus(po_ID, poStatus) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const response = await axios.get(`${config.apiDomain}/restaurant/updatepostatus/${po_ID}/${poStatus}`, axiosConfig);
  
    return response.data;
  }
  catch (err) {
    console.log(err);
    return err;
  }
};