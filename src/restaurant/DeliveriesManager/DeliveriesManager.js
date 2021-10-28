import React, { useState } from 'react'
import NavigationDM from '../../components/top-nav/NavigationDM'
import Topbar from '../../components/top-nav/topbar';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import ViewPending from './components/ViewPending';
import ViewProfile from '../../profile/viewprofile';
import AcceptedOrders from './components/AcceptedOrders';
import { Redirect, Route, Switch } from 'react-router-dom';
import DelFirstLogin from './components/DelFirstLogin';

/***********************************************************************
 * Orders Table data
 * fieldnames: 	order_ID, o_cust_ID,	o_rest_ID,	order_datetime,
 * order_type, order_status, total_cost, payment_status
 * NOTE: order_type will contain delivery / preorder,
 * order_status will contain pending, accepted, preparing, delivering, 
 * delivered, payment_status (not relevant here?) will be true, false.
 ***********************************************************************
 * order_item Table data
 * fieldnames: 	order_item_ID, oi_order_ID, oi_menu_item_ID, 
 * oi_item_name,	special_order
 * NOTE: special_order will contain the customer's special request, like
 * for example, no garlic, not spicy, so on...
 ***********************************************************************
*/

export default function DeliveriesManager() {
  
  const [isVisible, setIsVisible] = useState(true); 
  const [isSelected, setIsSelected] = useState(1);
  const [firstLog, setFirstLog] = useState(false);

  const toggleVisibility = () => {
    if (isVisible)
    {
      setIsVisible(false)
    }
    else
    {
      setIsVisible(true)
    }
  }

  return (
    <Box sx={{ padding:'1% 2%', bgcolor:'#f5f5f5', display:'block'}}>
      <Topbar toggleVisibility={toggleVisibility}/>
      <NavigationDM isVisible={isVisible} isSelected={isSelected} setIsSelected={setIsSelected} />

      <Box sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        <Switch>
          <Route path='/deliveriesmanager/viewpending'><ViewPending/></Route>
          <Route path='/deliveriesmanager/acceptedorders'><AcceptedOrders/></Route>
          <Route path="/deliveriesmanager/profile" component={ViewProfile}/>
          <Redirect from='/deliveriesmanager' to='/deliveriesmanager/viewpending'/>
        </Switch>
      </Box>

      <Modal
        open={firstLog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{bgcolor:'white',position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width:"50%",
          padding: '2%',
          maxHeight:'70%',
          overflow: 'auto',
          borderRadius:'5px'}}>
           <DelFirstLogin setFirstLog={setFirstLog}/>
         </Box>
      </Modal>
    </Box>
  )
}
