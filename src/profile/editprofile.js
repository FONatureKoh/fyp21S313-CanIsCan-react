import React from 'react'
import { TextField, Grid, Button, Typography, CardContent, CardHeader, Card } from '@mui/material'
import john from '../assets/temp/johnsmith.png'
import { useHistory } from 'react-router-dom'

export default function EditProfile() {

    const history = useHistory();

    const cancelBtn = () => {
        history.push('/generalmanager/profile');
    }

    const personalinfo = { 
        username: 'johnsmith',
        name: "John Smith", 
        phone: '+65 9876 5432',
        address: 'Blk111, Ang Mo Kio Avenue 1 #01-111 S(111111)'
    };

  return (
    <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
            <CardHeader title="Edit Personal Information" />
            <CardContent >
                <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                    <Grid item xs={6} sx={{textAlign:'center', marginTop:'10%;'}}>
                        <img src={john} width="60%"/>
                        <Typography sx={{textAlign:'center', fontSize:'1 0px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
                    </Grid>
      
                <Grid item xs={6} sx={{textAlign:'center'}}>
                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Username:" variant="filled" size="small" defaultValue={personalinfo.username} disabled/>
                    
                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Full Name (Required*):" variant="filled" size="small" defaultValue={personalinfo.name}/>

                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Phone Number (Required*):" variant="filled" size="small" defaultValue={personalinfo.phone}/>

                    <TextField id="filled-multiline-static" label="Address (Required*):"  multiline rows={4} variant="filled" sx={{width:'100%', margin:'15px'}} defaultValue={personalinfo.address}/>
                </Grid>
    
                <Grid item xs={12} sx={{textAlign:'center', marginTop:'5%'}}>
                    <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start', marginRight:'5%'}}>Confirm</Button>
                    <Button variant="contained" onClick={cancelBtn} color="inherit" sx={{width:'45%', bgcolor:"#CCCCCC", textAlign:'flex-start'}}>Cancel</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  </div>
  )
}