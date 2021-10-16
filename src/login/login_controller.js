import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../store/user_context';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const apiDomain = 'http://localhost:5000';            // Use this when testing
// const apiDomain = 'https://api.cancanfoodapp.xyz';    // Use this when deploying

/*****************************************************************************************
 * Login Auth function                                                                   *
******************************************************************************************
 * - Should take in username and password
 * - Should return success and user type 
 * 
 */

export function loginAuth (username, password) {
  return axios.post(`${apiDomain}/auth/login`, {
      username: username,
      password: password
    })
    .then(response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
}