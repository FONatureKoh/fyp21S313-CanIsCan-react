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

export default function Cart({openCart, cart}) {
  return (
    <Box >
      <Fab color="inherit" aria-label="cart" sx={style} onClick={openCart}>
      <Badge badgeContent={cart.length} color='primary' sx={{bgcolor:'grey'}}>
        <ShoppingCartIcon fontSize="large"/>
      </Badge>
      </Fab>
    </Box>
  )
}
