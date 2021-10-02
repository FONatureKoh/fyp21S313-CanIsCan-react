import logo from '../../assets/logo.svg';
import profile from '../../assets/icon-profile.png';
import './topnav.css';

// the icon-profile should not appear if viewing/editing profile
// will look into adding the general manager top right icons

export default function TopNav(){
    return (
        <div className="holder">
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
//<img src="icon-profile.png" alt="foodonclick" width="58" height="51"></img>