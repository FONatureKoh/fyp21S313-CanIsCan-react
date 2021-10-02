import TopNav from '../../components/top-nav/topnav';
import './generalmanager.css';
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
        <div className="gmlp_container">
                <div>
                    <button className="gmlp_btn" onClick= {editmenu}>Manage Menu Items</button>
                </div><div>
                    <button className="gmlp_btn">Manage Employee Profiles</button>
                </div><div>
                    <button className="gmlp_btn">View Store Analytics</button>
                </div>
        </div>
    </div>
    )
}
