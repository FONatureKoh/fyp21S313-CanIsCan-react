import React, {useRef, useState}from 'react'
import TopNav from '../../components/top-nav/topnav'
import './EditMenu.css'
import ViewMenuList from '../../components/rest-view-menu/ViewMenuList';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { Drawer } from '@mui/material';
import Navigation1 from '../../components/top-nav/navigation1'
import Topbar from '../../components/top-nav/topbar';
import { Container } from '@mui/material';
import ProfileIcon from '../../components/top-nav/profile-icon';
import { Box } from '@mui/system';

export default function EditMenu() {
  
  const dynamic = useRef();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory()
  const [isVisible, setIsVisible] = useState(true);
  
  const toggleVisibility = () => {
    if (isVisible)
    {
      setIsVisible(false)
    }
    else
    {
      setIsVisible(true)
    }
  }

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
    <div className="main2">
    <Topbar toggleVisibility={toggleVisibility}/>
    <Navigation1 isVisible={isVisible}/>

    <Box className="main3" sx={{mt:'80px',  ml:isVisible ? '240px' : '', transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;'}}>
        
        <div className="emenu_add">
            <button className="emenu_addBtn" onClick={additem}>Add Item</button>
        </div>
        <div className="emenu_buttons" ref= {dynamic}>

        <Typography sx={{textAlign: 'left', marginBottom: 2}}><FiberManualRecordIcon color="success" sx={{ fontSize: 12}} /> Menu Items Currently Active</Typography>
          {
            <ViewMenuList menu_items={data} />
            //<button class="emenu_btn"> {element.name} </button>
          }
        </div>
    </Box>
    </div>
  )
}
