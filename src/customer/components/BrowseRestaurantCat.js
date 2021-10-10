import React from 'react'
import { Card, CardHeader, CardContent, Box, CardActionArea } from '@mui/material'
import { CardMedia, Button, Typography, CardActions } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chip } from '@mui/material'


export default function BrowseRestaurantCat({restData, catData}) {

  const [cat, setCat] = React.useState('');

  const handleChange = (event) => {
    setCat(event.target.value);
  };


  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', mt:'20px', '.MuiCardHeader-action':{overflow:'visible', width:'200px'},}}>
        <CardHeader action={
          <FormControl fullWidth>
          <InputLabel sx={{width:'200px'}} id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            label="Category"
            onChange={handleChange}
          >
            {catData.map(cat => (
              <MenuItem value={cat}>{cat}</MenuItem>
            ))}

          </Select>
        </FormControl>
        }
        title="Browse Restaurants - Categories" />
        <CardContent >
          <Box > 
          <Grid 
            container
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
          {restData.map(rest => (
              <Grid item xs={12} sm={6} md={2} key={restData.indexOf(rest)}>
              {/* Card generation for restaurant */}
              <Card variant="outlined" sx={{ maxWidth: 300, mb:'20px'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                   {rest.name}
                  </Typography>
                  <Rating name="read-only" value={rest.rating} readOnly size='small' precision={0.1}/>
                  <Typography variant="body2" color="text.secondary">
                  <Chip label={rest.category} />
                  </Typography>
                </CardContent>
                <CardActionArea className="123" sx={{padding:'10px'}}>
                  <Box sx={{width:'100%'}}>
                    <Button variant="outlined" color="inherit" sx={{width:'100%'}}>Order</Button>
                  </Box>
                </CardActionArea>
              </Card>
              </Grid>
            ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
  )
}
