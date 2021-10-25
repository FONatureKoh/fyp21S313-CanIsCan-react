import React from 'react'
import { Card, CardHeader, CardContent, Box, CardActionArea } from '@mui/material'
import { CardMedia, Button, Typography } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Chip } from '@mui/material'
import { getCategoryRestaurant } from '../customer_controller'


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

  /****************************************************************************************************************
   * FOLLOWING IS HOW THE RETURNED DATA WILL LOOK LIKE 
   ****************************************************************************************************************
   * Note that it should usually return an array with even more elements. For the example below I give one template
   * only on how the variables look like with their names from the rest API
   * [{
        "restaurant_ID": 1,
        "restaurant_name": "Kelvin's Cat Cafe",
        "rest_rgm_username": "elephant1995",
        "rest_banner_ID": null,
        "rest_op_hours": "11:30 AM to 11:00 PM",
        "rest_phone_no": "91234567",
        "rest_address_info": "Blk 111 Ang Mo Kio #01-01",
        "rest_postal_code": 656565,
        "rest_tags": [
          "Cafe",
          "Fine Dining"
        ],
        "rest_rating": 5,
        "rest_status": "closed",
        "rest_opening_time": "11:30:00",
        "rest_closing_time": "23:00:00",
        "rest_tag_1": "Cafe",
        "rest_tag_2": "Fine Dining",
        "rest_tag_3": null
      }]
  */


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
          {selectedRestaurants.map(rest => (
              <Grid item xs={12} sm={6} md={3} key={selectedRestaurants.indexOf(rest)}>
              {/* Card generation for restaurant */}
              <Card variant="outlined" sx={{ maxWidth: 300, mb:'20px'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                   {rest.restaurant_name}
                  </Typography>
                  <Rating name="read-only" value={rest.rest_rating} readOnly size='small' precision={0.1}/> {rest.rest_rating}
                  <Typography variant="body2" color="text.secondary">
                    {rest.rest_tags.map(tag => (
                      <Chip label={tag} />
                    ))}
                  </Typography>
                </CardContent>
                <CardActionArea className="123" sx={{padding:'10px'}}>
                  <Box sx={{width:'100%'}}>
                    <Button variant="outlined" color="inherit" sx={{width:'100%'}}>View Restaurant</Button>
                  </Box>
                </CardActionArea>
              </Card>
              </Grid>
            ))}
            </Grid>
            <Grid item md={12}>
              <Button fullWidth variant="outlined" color="inherit">Load More</Button>
            </Grid>
          </Box>
        </CardContent>
      </Card>
  )
}
