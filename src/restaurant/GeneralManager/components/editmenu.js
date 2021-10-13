import React, { useContext } from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import { Box } from '@mui/system';
import { Route, Switch } from 'react-router';
import EditItem from './edititem';
import AddItem from './additem';
import { UserContext } from '../../../store/user_context';

export default function Editmenu({menuData, itemSelected, setItemSelected}) {
  console.log(menuData);
  const testContext = useContext(UserContext);
  console.log(testContext.username[0]);

  return (
     <Switch>
      <Route exact path="/generalmanager/editmenu">
        <Box>
        {/* <Card variant="outlined" sx={{padding:'10px', borderRadius:'20px'}}> */}
        <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Edit Menu" />
          <CardContent >
          <Box display='flex' flexDirection="column" sx={{margin:'10px auto', width:'80%'}}> 
              <Box alignSelf='flex-end'>
                <Button variant="outlined" color="inherit" component={Link} to="/generalmanager/editmenu/additem" >ADD ITEM</Button>
              </Box>
              <Box alignSelf='flex-start'>
                <Typography sx={{textAlign: 'left', display:'inline-block'}}><FiberManualRecordIcon color="success" sx={{ fontSize: 12, alignSelf:'flex-start'}} /> Menu Items Currently Active</Typography>
              </Box>
          </Box>
          <Box sx={{margin:'10px auto', width:'80%'}}>
              <ViewMenuList menuData={menuData} itemSelected={itemSelected} setItemSelected={setItemSelected} />
          </Box>
          </CardContent>
        </Card>
        </Box>
      </Route>
     <Route path="/generalmanager/editmenu/edititem"> <EditItem menuData={menuData} /></Route>
     <Route path="/generalmanager/editmenu/additem" component= {AddItem}/>
   </Switch>
  )
}
