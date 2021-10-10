import * as React from 'react'
import { Button, Card, CardHeader, Box } from '@mui/material'
import { CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router';
import AddSubUser from './addsubuser';
import EditSubUser from './editsubuser';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function ManageUser() {
  const [userIDSelected, setUserIDSelected] = useState('');    
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog= () => {
      setOpenDialog(true);
  };

  const handleCloseDialog = () => {
      setOpenDialog(false);
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 300 },
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
          onClick={setUserIDSelected(cellValues.name)}
          onClick={handleOpenDialog}
        >
          Remove
        </Button>
      );
    }
  }
];

const rows = [
  { id: 1, name: 'Thomas Koh', type: 'Restaurant General Manager'},
  { id: 2, name: 'Kelvin Koh Jia Jun', type: 'Deliveries Manager'},
  { id: 3, name: 'Donna', type: 'Reservations Manager'},
  { id: 4, name: 'Duncan', type: 'Deliveries Manager'},
  { id: 5, name: 'Hong Wei', type: 'Deliveries Manager'},
  { id: 6, name: 'Prem', type: 'Reservations Manager'},
  { id: 7, name: 'Ng Yong Wen', type: 'Reservations Manager'},
  { id: 8, name: 'Sam Chua', type: 'Deliveries Manager'},
  { id: 9, name: 'Tan Ah Koi', type: 'Reservations Manager'},
];

console.log(userIDSelected);
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
              rows={rows}
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
                    Confirm delete '{userIDSelected}'?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} variant="outlined" color="inherit">Confirm</Button>
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
        <Route path="/generalmanager/manageuser/editsubuser"><EditSubUser userData={rows}/></Route>
      </Switch>

      
  )
}
