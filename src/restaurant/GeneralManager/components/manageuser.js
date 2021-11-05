import React, { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Box, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Route, Switch, Link } from 'react-router-dom'
import AddSubUser from './addsubuser';
import EditSubUser from './editsubuser';
import { allSubUsers } from '../../restaurant_controller';
import { deleteSubuser } from '../rgm_controller';

export default function ManageUser() {
  // Usestate for page controls
  const [userIDSelected, setUserIDSelected] = useState('');    
  const [selectedName ,setSelectedName] = useState('');
  const [usernameSelected, setUsernameSelected] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [subUsersArray, setSubUsersArray] = useState([]);

  // Creating allSubUsers to store original array
  // I changed the userData to store this one cos the subUserArray
  // I transformed it to show here in this page only
  const [subUsers, setSubUsers] = useState([]);

  // Async functions used for this page
  async function getSubUsers() {
    try {
      const response = await allSubUsers();
      setSubUsers(response);

      return response;  
    } 
    catch (error) {
      return error;
    }
  }

  // Essential page functions
  // This following function is for deleting the user
  const handleOpenDialog= () => {
    setOpenDialog(true);
  };

  const handleConfirmDialog = () => {
    deleteSubuser(userIDSelected, usernameSelected)
      .then((response) => {
        if (response.api_msg === "success") {
          alert(`Subuser with username ${usernameSelected} and full name ${selectedName} has been deleted!`);
        }
        else {
          alert(`Something went wrong.`);
        }
      })
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Deployed the useEffect to get the restaurant subuser stuff
  useEffect(() => {
    // console.log("UseEffect Triggered");
    getSubUsers()
      .then((response) => {
        // We now construct only what we need from the data retrieved
        var subuser_array = [];

        response.forEach(subuser => {
          var temp_json = {
            id: subuser.subuser_ID,
            username: subuser.subuser_username,
            name: subuser.first_name + " " + subuser.last_name,
            type: subuser.subuser_type
          };

          subuser_array.push(temp_json);
        });

        setSubUsersArray(subuser_array);
      })
      .catch(error => console.log(error));
  },[openDialog]);

  const columns = [
    { field: 'id', headerName: 'User ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'username', hide: true },
    { field: 'type', headerName: 'Account Type', width: 300 },
    {
      field: "  ",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            id={cellValues.id}
            color="inherit"
            fullWidth
            component={ Link } 
            to={`/generalmanager/manageuser/editsubuser/${cellValues.id}`}
          >
            Edit
          </Button>
        );
      }
    },
    {
      field: " ",
      renderCell: (cellValues) => {
        return (
          <Button
            id={cellValues.name}
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              setSelectedName(cellValues.row.name);
              setUserIDSelected(cellValues.row.id);
              setUsernameSelected(cellValues.row.username);
              handleOpenDialog();
            }}
          >
            Remove
          </Button>
        );
      }
    }
  ];

  // const subUsers = [
  //   { id: 1, name: 'Thomas Koh', type: 'Restaurant General Manager'},
  //   { id: 2, name: 'Kelvin Koh Jia Jun', type: 'Deliveries Manager'},
  //   { id: 3, name: 'Donna', type: 'Reservations Manager'},
  //   { id: 4, name: 'Duncan', type: 'Deliveries Manager'},
  //   { id: 5, name: 'Hong Wei', type: 'Deliveries Manager'},
  //   { id: 6, name: 'Prem', type: 'Reservations Manager'},
  //   { id: 7, name: 'Ng Yong Wen', type: 'Reservations Manager'},
  //   { id: 8, name: 'Sam Chua', type: 'Deliveries Manager'},
  //   { id: 9, name: 'Tan Ah Koi', type: 'Reservations Manager'},
  // ];

  // console.log(userIDSelected);

  return (
      <Switch>
        <Route exact path="/generalmanager/manageuser">
          <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
          <CardHeader title="Manage Accounts"/>
          
          <CardContent sx={{height:'480px'}}>
            <Box  display='flex' flexDirection="column" >
              <Button variant="outlined" color="inherit" component={ Link } to="/generalmanager/addsub-user" sx={{alignSelf:'flex-end', mb: '5px'}}>Add New Employee</Button>
            </Box>
            <Box height="400px" sx={{'.MuiDataGrid-columnHeaderWrapper': {backgroundColor:'#eeeeee'}}} >
              <DataGrid
              rows={subUsersArray}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirm item deletion?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Confirm delete '{selectedName}'?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleConfirmDialog} variant="outlined" color="inherit">Confirm</Button>
                  <Button onClick={handleCloseDialog} variant="outlined" color="error">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
        </CardContent>
        </Card>
        </Route>
        <Route path="/generalmanager/manageuser/addsubuser"><AddSubUser/></Route>
        <Route path="/generalmanager/manageuser/editsubuser"><EditSubUser userData={subUsers}/></Route>
      </Switch> 
  )
}
