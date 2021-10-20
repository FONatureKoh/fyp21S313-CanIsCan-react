import axios from 'axios';

/*****************************************************************************************
 * Some application settings to be used throughout the controller
******************************************************************************************/
const config = require('../store/config.json');

/*****************************************************************************************
 * Restaurant Registration controller                                                    *
******************************************************************************************/
export function restaurantRegister (username, restaurat_name, email, phone) {
  // x-www-form-urlencoded form creation
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('restaurant_name', restaurat_name);
  params.append('email', email);
  params.append('phone', phone)

  // Looks like have to config so that the request becomes a form request
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return axios.post(`${config.apiDomain}/register/restaurant`, params, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
}

/*****************************************************************************************
 * Customer Registration controller                                                      *
******************************************************************************************/
export function customerRegister (username, password, email) {
  // x-www-form-urlencoded form creation
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('email', email);

  // Looks like have to config so that the request becomes a form request
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return axios.post(`${config.apiDomain}/register/customer`, params, axiosConfig)
    .then(res => {
      // In here we can choose what we want to do with the response of the request
      // console.log(res)
      return res.data;
    })
    .catch(err => {
      console.log(err)
    });
}