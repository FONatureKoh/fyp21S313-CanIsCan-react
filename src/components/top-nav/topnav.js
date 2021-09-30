import logo from '../../assets/logo.svg';
import profile from '../../assets/icon-profile.png';
import './topnav.css';
import { Component } from 'react';

// the icon-profile should not appear if viewing/editing profile
// will look into adding the general manager top right icons

class TopNav extends Component {
    render() {
        return (
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
        );
    }
}

export default TopNav;

//<img src="icon-profile.png" alt="foodonclick" width="58" height="51"></img>