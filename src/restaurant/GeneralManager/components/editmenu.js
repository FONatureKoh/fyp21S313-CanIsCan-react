import React from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, Typography } from '@mui/material'
import { useHistory } from 'react-router';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import { Box } from '@mui/system';
import { Container } from '@mui/material';

export default function Editmenu() {

  const history = useHistory()

  function additem(){
    let path = "/additem";
    history.push(path);
  }

  const data = [
    {
      id: 1,
      available: true,
      name: 'Chicken Chop',
      price: 7.90,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 2,
      available: true,
      name: 'Chicken Cutlet',
      price: 8.90,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 3,
      available: true,
      name: 'Chicken Wing (2pcs)',
      price: 3.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 4,
      available: false,
      name: 'Kobe Beef Steak (100g)',
      price: 99.90,
      desc: 'Most premium beef you can find in town!',
      allergies:'-'
    },
    {
      id: 5,
      available: true,
      name: 'Fish n Chips',
      price: 9.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 6,
      available: true,
      name: 'Seafood Platter',
      price: 15.90,
      desc: 'Delightful ',
      allergies:'Shell (Prawn, Clams)'
    },
    {
      id: 7,
      available: true,
      name: 'Fries',
      price: 11.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 8,
      available: true,
      name: 'Chicken Nugget (10pcs)',
      price: 3.00,
      desc: 'Delightful ',
      allergies:'-'
    },
    {
      id: 9,
      available: true,
      name: 'Cheese Dipping Sauce',
      price: 2.00,
      desc: 'Delightful ',
      allergies:'-'
    },
  ]

  return (
    <div className="main3" >
      {/* <Card variant="outlined" sx={{padding:'10px', borderRadius:'20px'}}> */}
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Edit Menu" />
        <CardContent >
        <Box display='flex' flexDirection="column" > 
            <Box alignSelf='flex-end'>
              <Button variant="outlined" color="inherit" component={Link} to="/generalmanager/additem" >ADD ITEM</Button>
            </Box>
            <Box alignSelf='flex-start'>
              <Typography sx={{textAlign: 'left', display:'inline-block'}}><FiberManualRecordIcon color="success" sx={{ fontSize: 12, alignSelf:'flex-start'}} /> Menu Items Currently Active</Typography>
            </Box>
        </Box>
        <div>
            {
              <ViewMenuList menu_items={data} />
              //<button class="emenu_btn"> {element.name} </button>
            }
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
