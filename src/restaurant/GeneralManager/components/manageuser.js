import * as React from 'react'
import { Button, Card, CardHeader, Typography, Box } from '@mui/material'
import { CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

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

export default function ManageUser() {
  return (
    <div className="main3" >
      <Card variant="outlined" sx={{width:'100%'}}>
        <CardHeader title="Manage Accounts"/>
        
        <CardContent sx={{height:'420px'}}>
          <Box  display='flex' flexDirection="column" >
            <Button variant="outlined" color="inherit" sx={{alignSelf:'flex-end', mb: '5px'}}>Add New Employee</Button>
          </Box>
          <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        </CardContent>
        </Card>
    </div>
  )
}
