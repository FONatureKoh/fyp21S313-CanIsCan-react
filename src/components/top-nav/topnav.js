import logo from '../../assets/logo.svg';
import profile from '../../assets/icon-profile.png';
import './topnav.css';

function topnav() {
  return (
    <div className="App">
        <div className="container">
            <div className="icon-foc">
                <img src={logo} className="icon-foc" alt="logo" />
            </div>
            <div className="foodonclick">
                <p>Food On Click</p>
            </div>
            <div className="icon-profile">
                <img src={profile} className="icon-profile" alt="profile" />
            </div>
        </div>
    </div>
  );
}

export default topnav;

//<img src="icon-profile.png" alt="foodonclick" width="58" height="51"></img>