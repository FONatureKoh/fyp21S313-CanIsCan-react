import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../store/user_context';

/********************************************
 * Login Auth function                      *
 * ******************************************
 * - Should take in username and password
 * - Should return success and user type */

export function loginAuth (username, password) {
  return axios.post('https://api.cancanfoodapp.xyz/auth/login', {
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