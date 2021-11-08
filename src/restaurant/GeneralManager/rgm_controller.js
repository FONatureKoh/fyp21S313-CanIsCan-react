import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

/*****************************************************************************************
 * Restaurant Adding a new category for items                                            *
 * ***************************************************************************************
 * - Adding a new category based on the user input   
 * ***************************************************************************************/
export async function checkCategory(catID) {
  // Config for Axios to send authorisation in header
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  try {
    const res = await axios.get(`${config.apiDomain}/restaurant/checkcategory/${catID}`, axiosConfig);
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
export async function addCategory(categoryName) {
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
 * Editing of item Categories name
 * ***************************************************************************************
 * Takes in subUserID, username, fname, lname, email, phone, role
 * ***************************************************************************************/
export async function updateCategoryName(catID, newCatName) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const editForm = new URLSearchParams();
  editForm.append("catID", catID);
  editForm.append("newCatName", newCatName);

  try {
    const res = await axios.put(`${config.apiDomain}/restaurant/itemCategoryManagement`, editForm, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Deleting of a category
 * ***************************************************************************************
 * Takes in subUserID, username, fname, lname, email, phone, role
 * ***************************************************************************************/
export async function deleteCategory(catID, safeDelete) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    data: {
      catID, safeDelete
    }
  };

  try {
    const res = await axios.delete(`${config.apiDomain}/restaurant/itemCategoryManagement`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};
/*****************************************************************************************
 * Editing details of subuser
 * ***************************************************************************************
 * Takes in subUserID, username, fname, lname, email, phone, role
 * ***************************************************************************************/
export async function updateSubuser(subUserID, username, fname, lname, email, phone, role) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  const editForm = new URLSearchParams();
  editForm.append("username", username);
  editForm.append("fname", fname);
  editForm.append("lname", lname);
  editForm.append("email", email);
  editForm.append("phone", phone);
  editForm.append("role", role);

  try {
    const res = await axios.put(`${config.apiDomain}/restaurant/rgm/subuser/${subUserID}`, editForm, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Deleting a subuser
 * ***************************************************************************************
 * Takes in subUserID, username
 * ***************************************************************************************/
export async function deleteSubuser(subUserID, username) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    data: {
      username
    }
  };
  // const editForm = new URLSearchParams();
  // editForm.append("username", username);

  try {
    const res = await axios.delete(`${config.apiDomain}/restaurant/rgm/subuser/${subUserID}`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Get data from two inputs, start date and end date
 * ***************************************************************************************
 * Takes in subUserID, username
 * ***************************************************************************************/
export async function getOrderStats(startDate, endDate) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    params: {
      startDate, endDate
    }
  };
  // const editForm = new URLSearchParams();
  // editForm.append("username", username);

  try {
    const res = await axios.get(`${config.apiDomain}/restaurant/rgm/getdeliverystatistics`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * Get data from two inputs, start date and end date
 * ***************************************************************************************
 * Takes in subUserID, username
 * ***************************************************************************************/
export async function getReservationStats(startDate, endDate) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    params: {
      startDate, endDate
    }
  };
  // const editForm = new URLSearchParams();
  // editForm.append("username", username);

  try {
    const res = await axios.get(`${config.apiDomain}/restaurant/rgm/getreservationstatistics`, axiosConfig);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};