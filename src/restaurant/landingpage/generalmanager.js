import TopNav from '../../components/top-nav/topnav';
import './generalmanager.css';
import { Component } from 'react';

class GeneralManagerView extends Component{
    render(){
        return (
            <div className="main">
                <TopNav />
                <div className="container">
                    <div className="buttonContainer">
                        <div className="buttons">
                            <button className="menu_btn">Manage Menu Items</button>
                            <br/>
                            <button className="menu_btn">Manage Employee Profiles</button>
                            <br/>
                            <button className="menu_btn">View Store Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralManagerView;
