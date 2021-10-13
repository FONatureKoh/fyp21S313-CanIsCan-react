import React from 'react'
import { TextField, Grid, Button, CardContent, CardHeader, Card } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function ChangePassword() {

    const history = useHistory();

    const cancelBtn = () => {
        history.push('/generalmanager/profile');
    }

  return (
    <div>
        <Card variant="outlined" sx={{margin:'auto', marginTop:'20vmin', width:'60%', padding:'5px', borderRadius:'10px'}}>
            <CardHeader title="Change Password" />
            <CardContent >
                <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
                    <Grid item xs={12} sx={{textAlign:'center'}}>
                    
                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Enter New Password:" variant="filled" size="small"/>

                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Re-enter New Password:" variant="filled" size="small"/>

                    <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Enter Old Password:" variant="filled" size="small"/>
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