import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function retrievePending () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/pending`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function existingRestaurants () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/activerestaurants`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function disableRestaurantAcc () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  var tempJSON = {

  }

  try {
    const res = await axios.put(`${config.apiDomain}/admin/disablerestaurant`, tempJSON, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function activeCustomers () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/activecustomers`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Disable existing Customer account
******************************************************************************************/
export async function disableAcc () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.put(`${config.apiDomain}/admin/disablecustomer`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function retrieveTags () {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/retrievetags`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Add new tag
******************************************************************************************/
export async function postNewTag(tag) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const tempJSON = {
    newTag: tag
  }

  try {
    const res = await axios.post(`${config.apiDomain}/admin/newtag`, tempJSON, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Delete a tag
******************************************************************************************/
export async function checkTag (tagName) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/admin/verifytag/${tagName}`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Delete a tag
******************************************************************************************/
export async function deleteTag (tagName) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    data: {
      tagName
    }
  };

  try {
    const res = await axios.delete(`${config.apiDomain}/admin/deletetag`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function approveRestaurant(restaurant_ID) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const tempJSON = {
    restID: restaurant_ID
  }

  try {
    const res = await axios.post(`${config.apiDomain}/admin/approve`, tempJSON, axiosConfig);
    return res.data;
  } 
  catch (err) {
    return err;
  }
}