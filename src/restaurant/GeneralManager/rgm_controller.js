import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../../store/config.json');

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