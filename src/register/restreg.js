import logo from '../assets/logo.svg';
import './restreg.css';
import React, { Component } from 'react';

class RestRegister extends Component { 

  constructor(props){
    super(props);
    this.state = {
      username: '',
      uen: '',
      email: ''
    }
  }

  back = (event) => {
    this.props.history.push('/');
  }

  register = (event) =>{
    if (this.state.username === 'abc123')
    {
      alert('WOW!');
      this.props.history.push('/');
    }
    else
    {
      alert('Please enter username and password!');
    }
  }

  updateInputValue(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  updateInputValueUEN(evt) {
    this.setState({
      uen: evt.target.value
    });
  }

  updateInputValueEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <a id="back" onClick={ this.back }>Back to Login</a>
          <img src={logo} className="App-logo" alt="logo" />
          <a class="whitefont" id="register">Restaurant Registration</a> 
          <input type="text" name="username" placeholder="Restaurant Name " value={this.state.username} onChange={ evt => this.updateInputValue(evt)}/>
          <input type="text" name="uen" placeholder="Restaurant Business UEN " value={this.state.uen} onChange={ evt => this.updateInputValueUEN(evt)}/>
          <input type="text" name="email" placeholder="Restaurant Email" value={this.state.email} onChange={ evt => this.updateInputValueEmail(evt)}/>
          <button className="go_btn" onClick={this.register}>Register</button>
          <div className="whitefont">Registering for business account <br/>takes up to 7 days for approval</div>
        </header>
      </div>
    );
  }
}
  

export default RestRegister;
