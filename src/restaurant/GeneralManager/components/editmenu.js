import React, { useContext, useState } from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, TextField, Typography } from '@mui/material'
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
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';


export default function Editmenu({menuData, itemSelected, setItemSelected}) {
  console.log(menuData);
  const [open, setOpen] = useState(false);
  const testContext = useContext(UserContext);
  const menuList = getMenu(menuData)
  console.log(menuList[0]);
  const [newMenu, setNewMenu] = useState('');
  const [value, setValue] = useState(menuList[0]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
 
  const handleClose = () => {
    setOpen(false);
    setNewMenu('')
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //function to get all menu name
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
    console.log(newMenu);
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
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {
                  getMenu(menuData).map(item => {
                  return <Tab label={item} value={item}/>
                  })
                }
                <Tab icon={<AddIcon fontSize="small"/>}label="ADD MENU" onClick={handleOpen} onChange={handleOpen}/>
              </TabList>
            </Box>
            <Box>
              <Typography sx={{textAlign: 'left', display:'inline-block', pt:'20px'}}>
                <FiberManualRecordIcon color="success" sx={{ fontSize: 12, alignSelf:'flex-start'}} /> Menu Items Currently Active
              </Typography>
            </Box>
            <Box sx={{margin:'10px auto', width:'100%'}}>
            {
              getMenu(menuData).map(item => {
                return <TabPanel value={item}> <ViewMenuList menuData={menuData} menuList={item} /></TabPanel>
              })
            }
            </Box>
          </TabContext>
          </Box>

          {/* DIALOG TO INPUT ADD MENU */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {"Add New Menu"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <TextField sx={{width:'80%', margin:'15px'}} 
                  id="filled-basic" 
                  label="Menu Name:" 
                  variant="filled" 
                  size="small"
                  onChange={(e)=> setNewMenu(e.target.value)}
                />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={addMenu}>Add Menu</Button>
                <Button onClick={handleClose} >Cancel</Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
        </Box>
      </Route>
     <Route path="/generalmanager/editmenu/edititem"> <EditItem menuData={menuData} /></Route>
     <Route path="/generalmanager/editmenu/additem" component= {AddItem}/>
   </Switch>
  )
}
