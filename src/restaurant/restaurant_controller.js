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
 * Delete a Restaurant item                                                              *
 * ***************************************************************************************
 * 
 * ***************************************************************************************/
export async function deleteRestaurantItem(itemID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.delete(`${config.apiDomain}/restaurant/restaurantItem/${itemID}`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
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
 * RGM editing of restaurant's profile                                                   *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export async function editRestaurantInfo(bannerImage, originalImageID, rest_name, rest_phone_no, email, address, 
  postal_code, opening_time, closing_time, tags) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const opening_timestamp = opening_time.getHours() + ":" + opening_time.getMinutes() + ":" + opening_time.getSeconds(); 
  const closing_timestamp = closing_time.getHours() + ":" + closing_time.getMinutes() + ":" + closing_time.getSeconds();

  const editForm = new FormData();
  editForm.append("bannerImage", bannerImage);
  editForm.append("originalImageID", originalImageID);
  editForm.append("restaurantName", rest_name);
  editForm.append("phoneNo", rest_phone_no);
  editForm.append("email", email)
  editForm.append("address", address);
  editForm.append("postal_code", postal_code);
  editForm.append("opening_time", opening_timestamp);
  editForm.append("closing_time", closing_timestamp);
  editForm.append("tags", tags);

  console.log("EditRestaurantInfo");

  try {
    const response = await axios.put(`${config.apiDomain}/restaurant/restaurantProfile`, editForm, axiosConfig);

    return response.data;    
  }
  catch (error) {
    return error;
  }
}

/*****************************************************************************************
 * RGM retrieving of restaurant's banner image                                           *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
 * ***************************************************************************************/
export async function retrieveBannerImage(bannerImageID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken},
    responseType: 'arraybuffer'
  };

  try {
    const response = await axios.get(`${config.apiDomain}/restaurant/restaurantBanner/${bannerImageID}`, axiosConfig);

    let blob = new Blob(
      [response.data], 
      { type: response.headers['content-type'] }
    )
    
    let image = URL.createObjectURL(blob);

    return image;  
  }
  catch (error) {
    return error;
  }
}

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
 * Restaurant Adding a new category for items                                            *
 * ***************************************************************************************
 * - Adding a new category based on the user input   
 * ***************************************************************************************/
export async function addRestaurantCategory(categoryName) {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.post(`${config.apiDomain}/restaurant/createNewCategory`, {ric_name: categoryName}, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Restaurant Adding a new category for items                                            *
 * ***************************************************************************************
 * - Adding a new category based on the user input   
 * ***************************************************************************************/
export async function updateCategory(categoryName) {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.post(`${config.apiDomain}/restaurant/createNewCategory`, {ric_name: categoryName}, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

/*****************************************************************************************
 * Restaurant Adding a new category for items                                            *
 * ***************************************************************************************
 * - Adding a new category based on the user input   
 * ***************************************************************************************/
export async function deleteCategory(categoryName) {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.post(`${config.apiDomain}/restaurant/createNewCategory`, {ric_name: categoryName}, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
}

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

/*****************************************************************************************
 * Restaurant Status retrieval                                                           *
 * ***************************************************************************************
 * - Get the status based on the username within the accessToken 
 * ***************************************************************************************/
export async function retrieveRestaurantStatus() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const response = await axios.get(`${config.apiDomain}/restaurant/restaurantStatus`, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
};

/*****************************************************************************************
 * Set Restaurant Status                                                          
 * ***************************************************************************************
 * - Set restaurant's status
 * ***************************************************************************************/
export async function setRestStatus(restStatus) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const tempJSON = {
    restStatus
  }

  try {
    const response = await axios.put(`${config.apiDomain}/restaurant/restaurantStatus`, tempJSON, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
};

/*****************************************************************************************
 * For DM / RM to get App user acount status
 * ***************************************************************************************
 * - This gets the DM's account status
 * ***************************************************************************************/
export async function getAccStatus() {
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  }

  try {
    const response = await axios.get(`${config.apiDomain}/users/accountstatus`, axiosConfig);

    return response.data;
  }
  catch (err) {
    return err;
  }
}

/*****************************************************************************************
 * For DM / RM to get its restaurant name
 * ***************************************************************************************
 * - This gets the DM's restaurant name
 * ***************************************************************************************/
export async function getRestName() {
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  }

  try {
    const response = await axios.get(`${config.apiDomain}/users/restaurantname`, axiosConfig);

    return response.data;
  }
  catch (err) {
    return err;
  }
}

/*****************************************************************************************
 * For DM / RM to get their profile
 * ***************************************************************************************
 * - profile retrieval
 * ***************************************************************************************/
export async function retrieveUserProfile() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  // console.log(axiosConfig);

  try {
    const res = await axios.get(`${config.apiDomain}/users/profilemanagement`, axiosConfig);
    // In here we can choose what we want to do with the response of the request
    // console.log(res)
    console.log(res.data);
    return res.data;
  } 
  catch (err) {
    return err;
  }
};

/*****************************************************************************************
 * First Login set user profile                                                          *
 * ***************************************************************************************
 * - send data to the user/profilemanagement route
 * ***************************************************************************************/
export async function postPersonalProfile (profileImage, fname, lname, phoneNo, email, 
  address, postalCode) {

  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  // Construct the form
  const postForm = new FormData();
  postForm.append("profileImage", profileImage);
  postForm.append("fname", fname);
  postForm.append("lname", lname);
  postForm.append("phoneNo", phoneNo);
  postForm.append("email", email);
  postForm.append("address", address);
  postForm.append("postalCode", postalCode);

  try {
    const response = await axios.post(`${config.apiDomain}/users/profilemanagement`, postForm, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * First Login set restaurant profile                                                    *
 * ***************************************************************************************
 * - send data to the restaurant/restaurantProfile POST route
 * ***************************************************************************************/
export async function postRestaurantProfile (bannerImage, address, postalCode, tags, openTime, closeTime) {

  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  // console.log(openTime);
  // console.log(closeTime);
  // Construct the form
  const postForm = new FormData();
  postForm.append("bannerImage", bannerImage);
  postForm.append("address", address);
  postForm.append("postalCode", postalCode);
  postForm.append("tags", tags);
  postForm.append("openingTime", openTime.toLocaleTimeString('en-GB'));
  postForm.append("closingTime", closeTime.toLocaleTimeString('en-GB'));

  try {
    const response = await axios.post(`${config.apiDomain}/restaurant/restaurantProfile`, postForm, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * First Login RGM User password change                                                  *
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export async function postChangePW(oldPassword, newPassword) {
  // Test consoles
  console.log("changePwController");
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const changeJSON = { 
    oldPassword: oldPassword,
    newPassword: newPassword
   };

  try {
    const res = await axios.put(`${config.apiDomain}/users/userpassword`, changeJSON, axiosConfig);
    // In here we can choose what we want to do with the response of the request
    // console.log(res)
    console.log(res.data);
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For RGM to add subuser to the system                                                  *
 * ***************************************************************************************
 * - This adds a new subuser to the system
 * ***************************************************************************************/
export async function postAddNewSubUser(username, fname, lname, email, phone, role) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  const postData = { 
    subuser_username: username,
    fname: fname,
    lname: lname,
    email: email,
    phone: phone,
    role: role
  };

  try {
    // This should get an Array of objects
    const res = await axios.post(`${config.apiDomain}/restaurant/rgm/addsubuser`, postData, axiosConfig);
  
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For RGM to retrieve all the subusers                                                  *
 * ***************************************************************************************
 * - This retrieves all the subusers based on the rgm's username
 * ***************************************************************************************/
export async function allSubUsers() {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const res = await axios.get(`${config.apiDomain}/restaurant/rgm/allsubusers`, axiosConfig);
  
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * For RGM to a single SubUser                                                           *
 * ***************************************************************************************
 * - This retrieves subuser based on the subuser ID
 * ***************************************************************************************/
export async function subUser(userID) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  try {
    // This should get an Array of objects
    const res = await axios.get(`${config.apiDomain}/restaurant/rgm/subuser/${userID}`, axiosConfig);
  
    return res.data;
  }
  catch (err) {
    console.log(err);
  }
};