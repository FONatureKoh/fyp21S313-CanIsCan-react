import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const apiDomain = 'http://localhost:5000';            // Use this when testing
// const apiDomain = 'https://api.cancanfoodapp.xyz';    // Use this when deploying


/*****************************************************************************************
 * All Items Retrieval function                                                          *
 * ***************************************************************************************
 * - Takes in restaurantID and retrieve all menu items based on that restaurant ID       *
 * ***************************************************************************************/
export function retrieveMenuItems(rest_ID) {
  return axios.get(`${apiDomain}/restaurant/retrieveMenuItems`, {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    params: {
      restaurantID: rest_ID
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
};

/*****************************************************************************************
 * All Categories retrieval based on restaurant ID function                              *
 * ***************************************************************************************
 * - Takes in restaurantID and retrieve all categories based on that restaurant's ID     
 * ***************************************************************************************/
export function retrieveCats() {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  return axios.get(`${apiDomain}/restaurant/itemCategory`, axiosConfig)
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
};

/*****************************************************************************************
 * All Items Retrieval based on item category function                                   *
 * ***************************************************************************************
 * - Takes in restaurantID and retrieve all menu items, grouped into their category,     
 * based on that restaurant ID       
 * ***************************************************************************************/
export function retrieveCatItems(rest_ID) {
  return axios.get(`${apiDomain}/restaurant/retrieveCategoriesItems`, {
    params: {
      restaurantID: rest_ID
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
};

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

  return axios.post(`${apiDomain}/restaurant/addmenuitem`, addItemForm, axiosConfig)
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
export function editRestaurantItem(itemID, imageFile, itemAvailability, itemName, itemPrice, 
  itemDesc, itemAllergy, itemCategory) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const editItemForm = new FormData();
  editItemForm.append("imageFile", imageFile);
  editItemForm.append("itemAvailability", itemAvailability);
  editItemForm.append("itemID", itemID)
  editItemForm.append("itemName", itemName);
  editItemForm.append("itemPrice", itemPrice);
  editItemForm.append("itemDesc", itemDesc);
  editItemForm.append("itemAllergy", itemAllergy);
  editItemForm.append("itemCategory", itemCategory);

  return axios.put(`${apiDomain}/restaurant/restaurantItem/${itemID}`, editItemForm)
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

  return axios.put(`${apiDomain}/restaurant/restaurantItem/${itemID}`, editItemForm)
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

  console.log(axiosConfig);

  return axios.get(`${apiDomain}/restaurant/restaurantProfile/`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};