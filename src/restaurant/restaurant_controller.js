import axios from 'axios'

/*****************************************************************************************
 * All Items Retrieval function                                                          *
 * ***************************************************************************************
 * - Takes in restaurantID and retrieve all menu items based on that restaurant ID       *
 * ***************************************************************************************/
export function retrieveMenuItems(rest_ID) {
  return axios.get('https://api.cancanfoodapp.xyz/restaurant/retrieveMenuItems', {
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
export function addRestaurantItem(imageFile, itemName, itemPrice, itemDesc, itemAllergy) {
  // Construct the form data
  const addItemForm = new FormData();
  addItemForm.append("imageFile", imageFile);
  addItemForm.append("itemName", itemName);
  addItemForm.append("itemPrice", itemPrice);
  addItemForm.append("itemDesc", itemDesc);
  addItemForm.append("itemAllergy", itemAllergy);

  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };
  
  console.log(axiosConfig);

  return axios.post("http://localhost:5000/restaurant/addmenuitem", addItemForm, axiosConfig)
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
export function editRestaurantItem(itemID, itemName, itemPrice, itemDesc, itemAllergy) {
  const editItemForm = new FormData();
  editItemForm.append("itemID", itemID)
  // editItemForm.append("imageFile", imageFile);
  editItemForm.append("itemName", itemName);
  editItemForm.append("itemPrice", itemPrice);
  editItemForm.append("itemDesc", itemDesc);
  editItemForm.append("itemAllergy", itemAllergy);

  return axios.put(`http://localhost:5000/restaurant/restaurantItem/${itemID}`, editItemForm)
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

  return axios.put(`http://localhost:5000/restaurant/restaurantItem/${itemID}`, editItemForm)
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

  return axios.get(`http://localhost:5000/restaurant/restaurantProfile/`, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};