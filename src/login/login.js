import logo from '../logo.svg';
import './login.css';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" name="username" placeholder="username "/>
        <input type="password" name="userpw" placeholder="password"/>
        <br/>
        <select>
            <option value="customer">Customer</option>
            <option value="restaurant_admin">Restaurant Manager</option>
			      <option value="deliveries">Deliveries Manager</option>
            <option value="reservations">Reservations Manager</option>
            <option value="administrator">Administrator</option>
        </select>
        <button class="go_btn" onclick="usertype()">Log In</button>
        <div class="whitefont">Don't have an account?</div>
        <a class="link" href="">Register</a>
      </header>
    </div>
  );
}

export default Login;
