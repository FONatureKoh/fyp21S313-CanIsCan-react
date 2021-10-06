import * as React from 'react'
import { Button, Card, CardHeader, Typography, Box } from '@mui/material'
import { CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'

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
          color="inherit"
          fullWidth
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
          variant="outlined"
          color="error"
          fullWidth
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

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

export default function ManageUser() {
  const headerStyle = useStyles();
  return (
    <div className="main3" >
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
          </Box>
        </CardContent>
        </Card>
    </div>
  )
}
