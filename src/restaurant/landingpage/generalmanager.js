import TopNav from '../../components/top-nav/topnav';
import './generalmanager.css';
import React, {useEffect}from 'react';
import { useHistory, withRouter} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GMmenu() {
     //for alert
    const [open, setOpen] = React.useState(false);
  
    const history = useHistory();

    useEffect(() =>{
        handleClick();
    },[])

    //for alert
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

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
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Welcome abc123!
            </Alert>
        </Snackbar>
    </div>
    
    )
}
