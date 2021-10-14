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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import AddIcon from '@mui/icons-material/Add';
import TabPanel from '@mui/lab/TabPanel';


export default function Editmenu({menuData, itemSelected, setItemSelected}) {
  console.log(menuData);
  const testContext = useContext(UserContext);
  console.log(testContext.username[0]);

  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  function getMenu(menu)
  {
    const check = [];
    const re = [];
    menu.map(item =>{
      if(check.includes(item.menu_type) === true)
      {
        check.push(item.menu_type)
      }
      else
      {
        check.push(item.menu_type)
        re.push(item.menu_type)
      }
    })
    return re;
  }

  function addMenu()
  {

  }

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

        <Box>
        {/* <Card variant="outlined" sx={{padding:'10px', borderRadius:'20px'}}> */}
        <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Edit Menu" />
          <CardContent >
          <Box display='flex' flexDirection="column" sx={{margin:'10px auto', width:'80%'}}> 
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {
                  getMenu(menuData).map(item => {
                  return <Tab label={item} value={item}/>
                  })
                }
                <Tab icon={<AddIcon fontSize="small"/>}label="ADD MENU"/>
              </TabList>
            </Box>
            <TabPanel value="Lunch Menu">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
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
