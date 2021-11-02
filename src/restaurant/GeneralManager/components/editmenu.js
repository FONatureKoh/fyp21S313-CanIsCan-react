import React, { useContext, useEffect, useState } from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
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
import { addRestaurantCategory, retrieveAllItems, retrieveCatItems, retrieveCats } from '../../restaurant_controller';

export default function Editmenu({menuData, itemSelected, setItemSelected}) {
  console.log("editmenu triggered");
  // Test console
  // console.log(menuData)
  // console.log(menuList[0]);
  
  // All useful states
  const [open, setOpen] = useState(false);
  const testContext = useContext(UserContext);
  //const menuList = getMenu(menuData)
  const [newMenu, setNewMenu] = useState('');
  const [value, setValue] = useState('0');
  const [menuData2, setMenuData2] = useState([]);
  const [categories, setCategories] = useState([]);

  // Async Function to get all the items 
  async function getAllItems(){
    try {
      const allItems = await retrieveAllItems();
      return allItems;
    }
    catch (error) {
      return error;
    }
  }

  // Async Function to get all the restaurant's categories
  async function getCategories(){
    try {
      const categories = await retrieveCats();
      return categories;
    }
    catch (error) {
      return error;
    }
  }

  // Async function to add a new category for the restaurant
  async function addNewCategory(){
    try {
      const response = await addRestaurantCategory(newMenu);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  useEffect(() => {
    // function to get all the restaurant's items
    getAllItems()
      .then((response) => {
        setMenuData2(response);
      })
      .catch(error => console.log(error));

    // function to get all restaurant categories name
    getCategories()
      .then((response) => {
        // Build the ric_name into an array
        var ric_name_array = []

        response.forEach(element => {
          ric_name_array.push(element.ric_name);
        });

        setCategories(ric_name_array);
      })
      .catch(error => console.log(error));
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
 
  const handleClose = () => {
    setOpen(false);
    setNewMenu('');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // Handles when we add new category
  function addMenu(){
    // Add new Category
    addNewCategory()
      .then((response) => {
        // Trigger the categories reload
        getCategories()
          .then((response) => {
            // Build the ric_name into an array
            var ric_name_array = [];

            response.forEach(element => {
              ric_name_array.push(element.ric_name);
            });

            setCategories(ric_name_array);
            
            // Set dialog to close
            setOpen(false);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
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
                  categories.map((ric_name, index) => {
                    return <Tab label={ric_name} value={index.toString()}/>
                  })
                }
                <Tab icon={<AddIcon value="add" fontSize="small"/>}label="ADD MENU" onClick={handleOpen}/>
              </TabList>
            </Box>

            
            
            <Box sx={{margin:'10px auto', width:'100%'}}>
            {
              categories.map((ric_name, index) => {
                return <>
                  <TabPanel id={index} value={index.toString()}> 
                  <Box>
                    <Grid container direction="row" alignItems="baseline" spacing={3}>
                      <Grid item xs md={5}>
                        <Typography sx={{textAlign: 'left', display:'inline-block'}}>
                          <FiberManualRecordIcon color="success" sx={{ fontSize: 10, alignSelf:'flex-start'}} /> Menu Items Currently Active
                        </Typography>
                      </Grid>
                      <Grid item xs md={3}>
                      </Grid>

                      <Grid item xs md={4}>
                        <Box display="flex" >
                        <Button variant="outlined" color="inherit" sx={{marginRight:'3px'}}>Edit Category Name</Button>
                        <Button variant="outlined" color="error" >Delete Category</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <ViewMenuList menuData={menuData2} menuList={ric_name} />
                  </TabPanel>
                </>
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
     <Route path="/generalmanager/editmenu/edititem"> <EditItem menuData={menuData2} /></Route>
     <Route path="/generalmanager/editmenu/additem" component= {AddItem}/>
   </Switch>
  )
}
