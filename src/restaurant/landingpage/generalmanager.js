import TopNav from '../../components/top-nav/topnav';
import classes from './generalmanager.css';
import React from 'react';
import { useHistory, withRouter} from 'react-router-dom';

export default function GMmenu() {
    const history = useHistory();

    function editmenu()
    {
        let path = "/editmenu";
        history.push(path);
    }

    return (
        <div className="main">
        <TopNav />
        <div className="container">
                <div>
                    <a className="menu_btn" onClick= {editmenu}>Manage Menu Items</a>
                </div>
                <div>
                    <a className="menu_btn">Manage Employee Profiles</a>
                </div>
                
                <a className="menu_btn">View Store Analytics</a>
        </div>
    </div>
    )
}
