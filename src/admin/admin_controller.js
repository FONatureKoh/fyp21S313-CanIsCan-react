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
 * Retrieve all pending restaurant accounts                                              *
******************************************************************************************/
export async function approveRestaurant (restaurant_ID) {
  // Config the access token
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.post(`${config.apiDomain}/admin/approve/${restaurant_ID}`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}