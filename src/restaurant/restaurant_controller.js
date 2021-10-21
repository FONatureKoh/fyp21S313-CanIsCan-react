import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Adding a new Restaurant item                                                          *
 * ***************************************************************************************
 * 
 * ***************************************************************************************/
export function addRestaurantItem(imageFile, itemAvailability, itemName, itemPrice, 
  itemDesc, itemAllergy, itemCategory) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const addItemForm = new FormData();
  addItemForm.append("imageFile", imageFile);
  addItemForm.append("itemAvailability", itemAvailability);
  addItemForm.append("itemName", itemName);
  addItemForm.append("itemPrice", itemPrice);
  addItemForm.append("itemDesc", itemDesc);
  addItemForm.append("itemAllergy", itemAllergy);
  addItemForm.append("itemCategory", itemCategory);

  return axios.post(`${config.apiDomain}/restaurant/addmenuitem`, addItemForm, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * Delete a Restaurant item                                                              *
 * ***************************************************************************************
 * 
 * ***************************************************************************************/
export function deleteRestaurantItem(itemID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.delete(`${config.apiDomain}/restaurant/restaurantItem/${itemID}`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * Editing a restaurant Item                                                             *
 * ***************************************************************************************
 * - Takes in ItemID. Since itemID is a primary key, there is no issue in editing the item
 * this way.
 * ***************************************************************************************/
export function editRestaurantItem(itemID, imageFile, itemAvailability, itemRestID, 
  itemPngID, itemName, itemPrice, itemDesc, itemAllergy, itemCategory) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const editItemForm = new FormData();
  editItemForm.append("itemID", itemID);
  editItemForm.append("imageFile", imageFile);
  editItemForm.append("itemAvailability", itemAvailability);
  editItemForm.append("itemRestID", itemRestID);
  editItemForm.append("itemPngID", itemPngID);
  editItemForm.append("itemName", itemName);
  editItemForm.append("itemPrice", itemPrice);
  editItemForm.append("itemDesc", itemDesc);
  editItemForm.append("itemAllergy", itemAllergy);
  editItemForm.append("itemCategory", itemCategory);

  return axios.put(`${config.apiDomain}/restaurant/restaurantItem/${itemID}`, editItemForm, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * RGM add subUsers                                                                      *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export function addRestaurantSubuser(itemID, itemName, itemPrice, itemDesc, itemAllergy) {
  const editItemForm = new FormData();
  editItemForm.append("itemID", itemID)
  // editItemForm.append("imageFile", imageFile);
  editItemForm.append("itemName", itemName);
  editItemForm.append("itemPrice", itemPrice);
  editItemForm.append("itemDesc", itemDesc);
  editItemForm.append("itemAllergy", itemAllergy);

  return axios.put(`${config.apiDomain}/restaurant/restaurantItem/${itemID}`, editItemForm)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * RGM retrieving of restaurant's profile                                                *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export function restaurantProfile() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  return axios.get(`${config.apiDomain}/restaurant/restaurantProfile/`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * Retrieve all available restaurant tags                                                *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export function retrieveRestaurantTags() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  return axios.get(`${config.apiDomain}/restaurant/tags`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * All Categories retrieval based on restaurant ID function                              *
 * ***************************************************************************************
 * - Retrieves all the restaurant's categories    
 * ***************************************************************************************/
export function retrieveCats() {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.get(`${config.apiDomain}/restaurant/itemCategory`, axiosConfig)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
};

/*****************************************************************************************
 * All Restaurant Items Retrieval based on item category function                        *
 * ***************************************************************************************
 * - Retrieves all the items from the database based on username in the access token     
 * ***************************************************************************************/
export function retrieveCatItems(ric_ID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.get(`${config.apiDomain}/restaurant/retrieveCategoriesItems/${ric_ID}`, axiosConfig)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
};

/*****************************************************************************************
 * All Restaurant Items Retrieval based on item category function                        *
 * ***************************************************************************************
 * - Retrieves all the items from the database based on username in the access token     
 * ***************************************************************************************/
export function retrieveAllItems() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.get(`${config.apiDomain}/restaurant/retrieveAllItems`, axiosConfig)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
};

/*****************************************************************************************
 * Single Restaurant Item retrieval                                                      *
 * ***************************************************************************************
 * - Retrieves a single restaurant item based on item's ID    
 * ***************************************************************************************/
export function retrieveItem(itemID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.get(`${config.apiDomain}/restaurant/restaurantItem/${itemID}`, axiosConfig)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
};