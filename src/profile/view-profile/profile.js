import TopNav from '../../components/top-nav/topnav';
import john from '../../assets/temp/johnsmith.png';
import './profile.css';
import { Component } from 'react';

//for all "personal profile"
//might consider to use this for restaurant profile too
//div "info" are just placeholder, requires hardcoding
class ProfileView extends Component{
    render(){
        return (
            <div className="main">
                <TopNav />
                <div className="container">
                    <div className="view-profile">
                        <div className="profile-block">
                            <div>
                                <img src={john} className="profilepic" alt="profilepic" />
                            </div>
                            <div> 
                                <div className="bold-info">Name</div>
                                <div className="info">MR. JOHN SMITH</div>
                                <div className="bold-info">Phone Number</div>
                                <div className="info">+65 9876 5432</div>
                                <div className="bold-info">Address</div>
                                <div className="info">Blk111, Ang Mo Kio Avenue 1 #01-111 S(111111)</div>
                            </div>
                        </div>
                        <div className="buttons">
                            <a className="update_btn">Update Profile</a>
                            <a className="logout_btn">Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileView;