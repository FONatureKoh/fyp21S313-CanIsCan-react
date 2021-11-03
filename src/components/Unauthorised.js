import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Unauthorised() {
  return (
    <Box sx={{width:'800px', height:'500px', bgcolor:'#efefef', margin:'auto', textAlign:'center', borderRadius:'20px'}}>
      <Typography variant="h2" sx={{marginTop:'20%', paddingTop:'80px'}}>Unauthorised!</Typography>
      <Typography variant="h6" sx={{paddingTop:'50px'}}>Opps! You are not supposed to be here!</Typography>
      <Typography variant="h6" sx={{paddingTop:'50px'}}>Click the button below to go back</Typography>

      <Button color="inherit" size="large" variant="outlined" sx={{marginTop:'30px'}} component={ Link } to="/">Back to login</Button>
    </Box>
  )
}
