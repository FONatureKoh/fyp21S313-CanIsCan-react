import logo from '../assets/logo.svg';
import './custreg.css';
import React, { Component } from 'react';

class CustRegister extends Component { 

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      pass: ''
    }
  }

  back = (event) =>{
    this.props.history.push('/');
  }

  restreg = (event) =>{
    this.props.history.push('/restreg');
  }

  register = (event) =>{
    if (this.state.username === 'abc123' && this.state.pass === '123123')
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

  updateInputValuePass(evt) {
    this.setState({
      pass: evt.target.value
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
          <a class="whitefont" id="register">Create an account</a> 
          <input type="text" name="username" placeholder="Username " value={this.state.username} onChange={ evt => this.updateInputValue(evt)}/>
          <input type="text" name="email" placeholder="Email " value={this.state.email} onChange={ evt => this.updateInputValueEmail(evt)}/>
          <input type="password" name="userpw" placeholder="Password" value={this.state.pass} onChange={ evt => this.updateInputValuePass(evt)}/>
          <button className="go_btn" onClick={this.register}>Register</button>
          <div className="whitefont">Restaurant User?</div>
          <a className="link" onClick={this.restreg}>Restaurant Register</a>
        </header>
      </div>
    );
  }
}
  

export default CustRegister;
