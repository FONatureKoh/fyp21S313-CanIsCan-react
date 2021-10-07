import React from 'react'
import { InputAdornment, Grid, Button, Typography, TextField, Switch, Card, CardContent, CardHeader, Box} from '@mui/material'
import { useRouteMatch } from 'react-router'

export default function EditItem({menuData}) {
  const match = useRouteMatch('/generalmanager/edititem/:id');
  console.log(match.params.id);
  let itemSelected;
    for(const item of menuData)
    {
      if(item.id === parseInt(match.params.id) )
      {
        itemSelected = item;
        break;
      }
    }

  const item = menuData

  return (
    <Card>
    <CardHeader title="Edit Item" />
    <CardContent >
    <Grid container sx={{margin:'auto', textAlign:'left', width: '70%'}} >
      <Grid item xs={6}>
        <img src={'asd'} height="200px" width="100%"/>
        <Typography sx={{textAlign:'center', fontSize:'10px', textDecoration:'underline', cursor:'pointer'}}>Upload Photo</Typography>
      </Grid>
      
      <Grid item xs={1}>
      </Grid>

      <Grid item xs={5}>
        <Typography textAlign="center" paddingTop="20%">Availability <Switch defaultChecked size="large" /></Typography>  
      </Grid>

      <Grid item xs={3}>
      </Grid>
      
      <Grid item xs={6} sx={{textAlign:'center'}}>
          <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Item Name (Required*):" variant="filled" size="small" defaultValue={itemSelected.name}/>

          <TextField
            label="Price (Required*)"
            id="filled-start-adornment"
            sx={{width:'100%', margin:'15px'}}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            variant="filled"
            defaultValue={itemSelected.price}
          />

        <TextField
          id="filled-multiline-static"
          label="Item Description (Required*): "
          multiline
          rows={4}
          variant="filled"
          sx={{width:'100%', margin:'15px'}}
          defaultValue={itemSelected.desc}
        />

        <TextField sx={{width:'100%', margin:'15px'}} id="filled-basic" label="Allergies Warning:" variant="filled" size="small" defaultValue={itemSelected.allergies}/>

        <Button variant="contained" color="inherit" sx={{width:'45%', bgcolor:"#969696", textAlign:'flex-start'}}>Confirm Changes</Button>
        
        <Button variant="contained" color="inherit" sx={{width:'45%', float:'right'}}>Cancel</Button>
      </Grid>

      <Grid item xs={3}>
      </Grid>
    </Grid>
    </CardContent>
    </Card>
  )
}
