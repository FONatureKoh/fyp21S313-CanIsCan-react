import React from 'react'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function ErorrPage() {
  
  const history = useHistory();
  return (
    <Box sx={{width:'800px', height:'500px', bgcolor:'#efefef', margin:'auto', textAlign:'center', borderRadius:'20px'}}>
      <Typography variant="h2" sx={{marginTop:'20%', paddingTop:'80px'}}>Something went wrong!</Typography>
      <Typography variant="h6" sx={{paddingTop:'50px'}}>We are working on it! Sorry for the inconvenience</Typography>
      <Typography variant="h6" sx={{paddingTop:'50px'}}>Click the button below to go back to where you were</Typography>

      <Button color="inherit" size="large" variant="outlined" sx={{marginTop:'30px'}} onClick={()=> history.goBack()}>Back</Button>
    </Box>
  )
}
