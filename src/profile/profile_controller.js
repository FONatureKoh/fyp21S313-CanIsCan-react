import axios from 'axios'

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * User retrieving profile information based on the usertype                             *
 * ***************************************************************************************
 * - This takes all the info from the RGM and creates the subuser based on the given data
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
    console.log(err);
  }
};

/*****************************************************************************************
 * User password change                                                                  *
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export async function changePwController(oldPassword, newPassword) {
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
    // console.log(res.data);
    return res.data;
  } 
  catch (err) {
    console.log(err);
  }
};

/*****************************************************************************************
 * User password change                                                                  *
 * ***************************************************************************************
 * - This takes in the old password, new password and sends it to the backend api 
 * for updating.
 * ***************************************************************************************/
export function verifyPwController(oldPassword) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {'Authorisation': window.sessionStorage.accessToken}
  };

  // Create simple form data
  const verifyJSON = { oldPassword: oldPassword };

  return axios.post(`${config.apiDomain}/users/userpassword`, verifyJSON, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
};

/*****************************************************************************************
 * First Login set user profile                                                          *
 * ***************************************************************************************
 * - send data to the user/profilemanagement route
 * ***************************************************************************************/
export async function editPersonalProfile (profileImage, fname, lname, phoneNo, email, 
  address, postalCode, oldImageFile) {

  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    }
  };

  // Construct the form
  const editForm = new FormData();
  editForm.append("profileImage", profileImage);
  editForm.append("fname", fname);
  editForm.append("lname", lname);
  editForm.append("phoneNo", phoneNo);
  editForm.append("email", email);
  editForm.append("address", address);
  editForm.append("postalCode", postalCode);
  editForm.append("oldImageFile", oldImageFile);

  try {
    const response = await axios.put(`${config.apiDomain}/users/profilemanagement`, editForm, axiosConfig);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
}

/*****************************************************************************************
 * Retrieve image function                                                               *
******************************************************************************************
 * - Takes in itemPngID and then fetches the image in form of image/png 
 */

export async function getImage(profileImagePng) {
  // Axios request config to be declared first
  const axiosConfig = {
    headers: {
      'Authorisation': window.sessionStorage.accessToken
    },
    responseType: 'arraybuffer'
  };

  try {
    const response = await axios.get(`${config.apiDomain}/users/profileImage/${profileImagePng}`, axiosConfig);
    let blob = new Blob(
      [response.data],
      { type: response.headers['content-type'] }
    );
    let image = URL.createObjectURL(blob);
    return image;
  } 
  catch (error) {
    console.log(error);
  }
}