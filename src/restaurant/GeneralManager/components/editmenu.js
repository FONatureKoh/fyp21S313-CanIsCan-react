import React, { useEffect, useState } from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, Grid, TextField, Typography, Card, Box, Tab, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Route, Switch, Link } from "react-router-dom";
import EditItem from './edititem';
import AddItem from './additem';
import AddIcon from '@mui/icons-material/Add';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { addRestaurantCategory, retrieveAllItems, retrieveCats } from '../../restaurant_controller';
import { updateCategoryName } from '../rgm_controller';

export default function Editmenu() {
  // console.log("editmenu triggered");
  // Test console
  // console.log(menuData)
  // console.log(menuList[0]);
  
  // All useful states
  
  //const menuList = getMenu(menuData)
  
  const [value, setValue] = useState('0');
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);

  // THIS HANDLES THE VALUE FOR THE TABS
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue)
  };

  // Async Function to get all the items 
  async function getAllItems(){
    try {
      // CONTROLLER HERE TO RETRIEVE ALL THE RESTAURANT ITEMS
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

  useEffect(() => {
    // function to get all the restaurant's items
    getAllItems()
      .then((response) => {
        setMenuData(response);
      })
      .catch(error => console.log(error));

    // function to get all restaurant categories name
    getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch(error => console.log(error));
  },[])

  /********************************************************************************************************************
   * EVERYTHING TO HANDLE ADDING OF A NEW CATEGORY
   ********************************************************************************************************************
   * INCLUDES DIALOG HANDLERS AND STATES
   */
  // STATES FOR WHEN A NEW MENU IS TO BE CREATED
  const [openAdd, setOpenAdd] = useState(false);
  const [newMenu, setNewMenu] = useState('');

  // Async function to add a new category for the restaurant
  async function addNewCategory(){
    try {
      // CONTROLLER FOR ADDING A NEW CATEGORY
      const response = await addRestaurantCategory(newMenu);
      return response.api_msg;
    }
    catch (error) {
      return error;
    }
  }

  // HANDLES ADD MENU DIALOG 
  const handleAddClose = () => {
    setOpenAdd(false);
    setNewMenu('');
    setValue('0');
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  // BUTTON FUNCTION FOR WHEN ADDMENU IS TRIGGERED
  function addMenu(){
    // Add new Category
    addNewCategory()
      .then((response) => {
        // Trigger the categories reload
        getCategories()
          .then((response) => {
            setCategories(response);
            
            // Set dialog to close
            setOpenAdd(false);
            setValue('0');
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  /********************************************************************************************************************
   * EVERYTHING TO HANDLE EDITING OF CATEGORY NAME
   ********************************************************************************************************************
   * INCLUDES DIALOG HANDLERS AND STATES
   */
  // STATES FOR EDIT MENU
  const [openEdit, setOpenEdit] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedCatID, setSelectedCatID] = useState(0);
  const [editedName, setEditedName] = useState('');

  // console.log(editedName);

  // HANDLES EDIT MENU DIALOG 
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditedName('');
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  // Handles when we edit the menu's name
  function editMenu() {
    updateCategoryName(selectedCatID, editedName)
      .then((response) => {
        if (response.api_msg === "success") {
          handleEditClose();
          setValue('0');

          // Refresh categories
          getCategories()
            .then((response) => {
              setCategories(response);
            });
        }
      });
  }

  // Handles when we delete a menu
  function deleteMenu() {
    
  }

  return <>
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
                  categories.map((category, index) => {
                    return <Tab label={category.ric_name} value={index.toString()}/>
                  })
                }
              <Tab icon={<AddIcon value="add" fontSize="small"/>}label="ADD MENU" onClick={handleAddOpen}/>
              </TabList>
            </Box>

            
            
            <Box sx={{margin:'10px auto', width:'100%'}}>
            {
              categories.map((category, index) => {
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
                        <Button variant="outlined" color="inherit" sx={{marginRight:'3px'}} 
                          onClick={() => {
                            handleEditOpen();
                            setEditCategoryName(category.ric_name);
                            setSelectedCatID(category.ric_ID);
                          }}
                        >
                          Edit Category Name
                        </Button>
                        <Button variant="outlined" color="error" >Delete Category</Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <ViewMenuList menuData={menuData} menuID={category.ric_ID} />
                  </TabPanel>
                </>
              })
            }
            </Box>
          </TabContext>
          </Box>

          {/* DIALOG TO INPUT ADD MENU */}
          <Dialog open={openAdd} onClose={handleAddClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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
              <Button onClick={handleAddClose} >Cancel</Button>
            </DialogActions>
          </Dialog>

          {/* DIALOG TO EDIT MENU */}
          <Dialog open={openEdit}  onClose={handleEditClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Edit Category Name"}
            </DialogTitle>
            <DialogContent>
              <Typography sx={{textAlign: 'left', display:'inline-block'}}>
                You are editing category name for your '{editCategoryName}' category
              </Typography>
              <DialogContentText id="alert-dialog-description">
              <TextField sx={{width:'90%', margin:'15px'}} 
                id="filled-basic" 
                label="Menu Name:" 
                variant="filled" 
                size="small"
                onChange={(e)=> setEditedName(e.target.value)}
              />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={editMenu}>Save Changes</Button>
              <Button onClick={handleEditClose} >Cancel</Button>
            </DialogActions>
          </Dialog>


          </CardContent>
        </Card>
        </Box>
      </Route>
     <Route path="/generalmanager/editmenu/edititem"> <EditItem menuData={menuData} setMenuData={setMenuData}/></Route>
     <Route path="/generalmanager/editmenu/additem"><AddItem /></Route>
   </Switch>
  </>
}
