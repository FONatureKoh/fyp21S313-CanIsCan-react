import React from 'react'
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import { Badge } from '@mui/material';

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 40,
  left: 'auto',
  position: 'fixed',
  width:'65px',
  height:'65px'
};

const items = []

export default function Cart() {
  return (
    <Box >
    
      <Fab color="inherit" aria-label="cart" sx={style}>
      <Badge badgeContent={4} color='primary' sx={{bgcolor:'grey'}}>
        <ShoppingCartIcon fontSize="large"/>
      </Badge>
      </Fab>
     
    </Box>
  )
}
