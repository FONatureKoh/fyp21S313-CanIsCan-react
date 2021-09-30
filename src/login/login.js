import logo from '../assets/logo.svg';
import './login.css';
import { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Login extends Component { 

  userType() {
    var select = document.getElementById('select-user').value;
    if(select === 'customer'){
      alert('Customer has been chosen: Under development');
    } else if (select === 'restaurant_admin'){
      alert('Restaurant Manager has been chosen: Under development');
    } else if (select === 'deliveries'){
      alert('Deliveries Manager has been chosen: Under development');
    } else if (select === 'reservations'){
      alert('Reservations Manager has been chosen: Under development');
    }else {
      alert('Admin has been chosen: Under development');
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" name="username" placeholder="username "/>
          <input type="password" name="userpw" placeholder="password"/>
          <select id="select-user">
              <option value="customer">Customer</option>
              <option value="restaurant_admin">Restaurant Manager</option>
              <option value="deliveries">Deliveries Manager</option>
              <option value="reservations">Reservations Manager</option>
              <option value="administrator">Administrator</option>
          </select>
          <button className="go_btn" onClick={this.userType}>Log In</button>
          <div className="whitefont">Don't have an account?</div>
          <a className="link">Register</a>
        </header>
      </div>
    );
  }
}
  

export default Login;
