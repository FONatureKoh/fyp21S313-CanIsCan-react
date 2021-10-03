import TopNav from '../../components/top-nav/topnav';
import banner from '../../assets/temp/eg-biz1.png';
import './restaurantprofile.css';

export default function RestaurantProfile(){

    return (
        <div className="main">
        <TopNav />
        <div className="rp_container">
            <div className="rp_viewprofile">
                <div>
                    <img src={banner} className="rp_banner" alt="banner" />
                </div>
                <div className="rp_bannerfont"><p>Restaurant Banner</p></div>
                <div className="rp_profileblock">
                    <div> 
                        <div className="rp_boldinfo">Restaurant Name</div>
                        <div className="rp_info">Default .co</div>
                        <div className="rp_boldinfo">Phone Number</div>
                        <div className="rp_info">+65 8765 4321</div>
                        <div className="rp_boldinfo">Address</div>
                        <div className="rp_info">Blk222, Ang Mo Kio Avenue 1 #02-222 S(222222)</div>
                    </div>
                </div>
                <div className="rp_buttons">
                    <a className="rp_btn1">Update Profile</a>
                    <a className="rp_btn2">Log Out</a>
                </div>
            </div>
        </div>
        </div>
    )
}