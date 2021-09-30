import TopNav from '../../components/top-nav/topnav';
import john from '../../assets/temp/johnsmith.png';
import './editprofile.css';
import { Component } from 'react';

//buttons are not final, will look into it later
class ProfileEdit extends Component{
    render(){
        return (
            <div className="main">
                <TopNav />
                <div className="container">
                    <div className="view-profile">
                        <div className="profile-block">
                            <div>
                                <img src={john} className="profilepic" alt="profilepic" />
                                <a className="upload" href="">Upload Image</a>
                            </div>
                            <div> 
                                <div className="bold-info">Username</div>
                                <div className="info">
                                    <input type="text" name="username" value="J.SMITH " disabled/>
                                </div>
                                <div className="info">
                                    <input type="text" name="contact" value="MR. JOHN SMITH"/>
                                </div>
                                <div className="info">
                                    <input type="text" name="contact" value="+65 9876 5432"/>
                                </div>
                                <div className="info">
                                <textarea name="address" placeholder="Address" rows="4" cols="50">Blk111, Ang Mo Kio Avenue 1 #01-111 S(111111)</textarea>
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <div>
                                <a className="change_btn">Change Password</a>
                            </div>
                            <div>
                                <a className="update_btn">Confirm</a>
                                <a className="cancel_btn">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEdit;