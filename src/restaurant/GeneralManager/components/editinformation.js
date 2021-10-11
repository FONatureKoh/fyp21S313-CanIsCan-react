import React, {useState} from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card } from '@mui/material'
import bannerpic from '../../../assets/temp/eg-biz1.png'
import { useHistory } from 'react-router-dom'

export default function EditProfile({restaurantinfo}) {

  const history = useHistory();

  const cancelBtn = () => {
    history.push('/generalmanager/restaurantinformation');
  }

  const [rName, setRName] = useState(restaurantinfo.rName);
  const [rPhone, setRPhone] = useState(restaurantinfo.rPhone);
  const [rAddress, setRAddress] = useState(restaurantinfo.rAddress);

  function submitChange()
  {
    console.log(rName);
    console.log(rPhone);
    console.log(rAddress);
  }

  return (
  <div>
    <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Edit Personal Information" />
        <CardContent >
          <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
            <Grid item xs={12} sx={{textAlign:'center', marginTop:'10%;'}}>
              <img src={bannerpic} width="60%"/>
              <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
            </Grid>
      
            <Grid item xs={12} sx={{textAlign:'center'}}>
              
              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Restaurant Name (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rName} onChange={(e)=>setRName(e.target.value)}/>

              <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Restaurant Contact Number (Required*):" variant="filled" size="small" defaultValue={restaurantinfo.rPhone} onChange={(e)=>setRPhone(e.target.value)}/>

              <TextField id="filled-multiline-static" label="Restaurant Address (Required*):"  multiline rows={4} variant="filled" sx={{width:'100%', margin:'15px'}} defaultValue={restaurantinfo.rAddress} onChange={(e)=>setRAddress(e.target.value)}/>
            </Grid>

            <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
              <Button variant="contained" onClick={submitChange} color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Confirm</Button>
              <Button variant="contained" onClick={cancelBtn} color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Cancel</Button>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  </div>
  )
}