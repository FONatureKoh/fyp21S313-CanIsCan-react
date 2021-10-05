import React from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, Typography } from '@mui/material'
import { useHistory } from 'react-router';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";

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
    <div className="main" >
      {/* <Card variant="outlined" sx={{padding:'10px', borderRadius:'20px'}}> */}
      <Card variant="outlined">
        <CardContent >
      <div className="emenu_add">
            <Button variant="outlined" color="inherit" component={Link} to="/generalmanager/additem" sx={{alignSelf:'flex-end'}}>ADD ITEM</Button>
        </div>
      <div className="emenu_buttons">


        <Typography sx={{textAlign: 'left', marginBottom: 2}}><FiberManualRecordIcon color="success" sx={{ fontSize: 12}} /> Menu Items Currently Active</Typography>
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
