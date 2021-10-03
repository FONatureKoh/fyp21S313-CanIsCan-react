import TopNav from '../../components/top-nav/topnav';
import john from '../../assets/temp/johnsmith.png';
import './profile.css';

//for all "personal profile"
//might consider to use this for restaurant profile too
//div "info" are just placeholder, requires hardcoding
export default function ProfileView(){
    return (
        <div className="main">
            <TopNav />
            <div className="pp_container">
                <div className="pp_viewprofile">
                    <div className="pp_profileblock">
                        <div>
                            <img src={john} className="profilepic" alt="profilepic" />
                        </div>
                        <div> 
                            <div className="pp_boldinfo">Name</div>
                            <div className="pp_info">MR. JOHN SMITH</div>
                            <div className="pp_boldinfo">Phone Number</div>
                            <div className="pp_info">+65 9876 5432</div>
                            <div className="pp_boldinfo">Address</div>
                            <div className="pp_info">Blk111, Ang Mo Kio Avenue 1 #01-111 S(111111)</div>
                        </div>
                    </div>
                    <div className="pp_buttons">
                        <a className="pp_updatebtn">Update Profile</a>
                        <a className="pp_logoutbtn">Log Out</a>
                    </div>
                </div>
            </div>
        </div>
    );
}