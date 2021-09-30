import logo from '../assets/logo.svg';
import './login.css';
import React, { Component } from 'react';

class Login extends Component { 

  constructor(props){
    super(props);
    this.state = {
      test: '',
      pass: ''
    }
  }

  login = (event) =>{
    if (this.state.test === 'abc123' && this.state.pass === '123123')
    {
      this.props.history.push('/gmmenu');
    }
    else
    {
      alert('Please enter username and password!');
    }
  }

  updateInputValue(evt) {
    this.setState({
      test: evt.target.value
    });
  }

  updateInputValuePass(evt) {
    this.setState({
      pass: evt.target.value
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" name="username" placeholder="username " value={this.state.test} onChange={ evt => this.updateInputValue(evt)}/>
          <input type="password" name="userpw" placeholder="password" value={this.state.pass} onChange={ evt => this.updateInputValuePass(evt)}/>
          <select id="select-user">
              <option value="customer">Customer</option>
              <option value="restaurant_admin">Restaurant Manager</option>
              <option value="deliveries">Deliveries Manager</option>
              <option value="reservations">Reservations Manager</option>
              <option value="administrator">Administrator</option>
          </select>
          <button className="go_btn" onClick={this.login}>Log In</button>
          <div className="whitefont">Don't have an account?</div>
          <a className="link">Register</a>
        </header>
      </div>
    );
  }
}
  

export default Login;
