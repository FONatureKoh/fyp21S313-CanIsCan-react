import React from 'react'
import { Card, CardHeader, CardContent, Box, CardActionArea } from '@mui/material'
import { CardMedia, Typography } from '@mui/material'
import { Rating } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chip } from '@mui/material'
import { getCategoryRestaurant } from '../customer_controller'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function BrowseRestaurantCat({restData, catData}) {
  // useful useStates
  const [cat, setCat] = React.useState('');
  const [selectedRestaurants, setSelectedRestaurants] = React.useState(restData);

  // Async function to get the restaurant info accordingly
  async function getRestaurantInfo(tag) {
    try {
      const response = await getCategoryRestaurant(tag);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  // Function Data
  const handleChange = (event) => {
    // For this flow, I thought we can do the thing where we will take in the tag and then query the database
    // and then this will return the restaurants according to the tag. Like if it is one of the 3 tags,
    // then it will be sent back
    console.log("Handled Change");
    // Sets the category first
    setCat(event.target.value);

    // Then trigger the async function to get all the restaurants that fits the category that the user selected
    getRestaurantInfo(event.target.value)
      .then((response) => {
        if (response) {
          console.log(response);
          setSelectedRestaurants(response);
        }
      })
      .catch(error => console.log(error));
  };

  return <>
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
            columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 15}}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            
          {selectedRestaurants.map(rest => (
            <Grid item xs={4} sm={4} md={4} lg={3} xl={3} key={selectedRestaurants.indexOf(rest)}>
            {/* Card generation for restaurant */}
            <Card variant="outlined" sx={{ maxWidth: 300, height:'330px', mb:'20px'}}>
            <CardActionArea component={ Link } to={`/customer/restaurantdetails/${rest.restaurant_ID}`}>
              <CardMedia
                component="img"
                height="140"
                image={rest.rest_banner}
              />
              <CardContent>
                <Box height="200px">
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {rest.restaurant_name}
                  </Typography>
                  <Typography gutterBottom  variant="subtitle2" component="div">
                    <LocationOnIcon />{rest.rest_address_info}
                  </Typography>
                  <Rating name="read-only" value={rest.rest_rating} readOnly size='small' precision={0.1}/> {rest.rest_rating}
                  <Typography variant="body2" color="text.secondary">
                    {rest.rest_tags.map(tag => (
                      <Chip label={tag} sx={{margin:'3px'}}/>
                    ))}
                  </Typography>
                </Box>
              </CardContent>
              </CardActionArea>
            </Card>
            </Grid>
          ))}
          </Grid>
          </Box>
        </CardContent>
      </Card>
  </>
}
