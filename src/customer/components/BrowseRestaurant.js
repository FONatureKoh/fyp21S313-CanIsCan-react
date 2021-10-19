import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box, CardActionArea } from '@mui/material'
import { CardMedia, Button, Typography } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import { Grid } from '@mui/material'
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

export default function BrowseRestaurant({restData}) {
  const [btnVisible, setBtnVisible] = useState(true);
  const menuCount = restData.length;
  const [shownNum, setShownNum] = useState(5);

  const clickShow = () => {
    setShownNum(shownNum + 5);
  };

  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Browse Restaurants - Top Picks" />
        <CardContent >
          <Grid 
            container
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12, lg: 15 }}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >

            {restData.slice(0, shownNum).map(rest => (
              <Grid item xs={4} sm={4} md={3} lg={3} key={restData.indexOf(rest)}>
              {/* Card generation for restaurant */}
              <Card variant="outlined" sx={{ maxWidth: 300, mb:'20px'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent >
                  <Box > </Box>
                  <Typography gutterBottom variant="h6" component="div" noWrap >
                   {rest.name}
                  </Typography>
                  <Rating name="read-only" value={rest.rating} readOnly size='small' precision={0.1}/>
                  <Typography variant="body2" color="text.secondary">
                  <Chip label={rest.category} />
                  </Typography>
                </CardContent>
                <CardActionArea className="123" sx={{padding:'10px'}}>
                  <Box sx={{width:'100%'}}>
                    <Button invisible variant="outlined" color="inherit" sx={{width:'100%'}} component={ Link } to={`/customer/browserestaurant/restaurantdetails/${rest.id}`}>View Restaurant</Button>
                  </Box>
                </CardActionArea>
              </Card>
              </Grid>
            ))}
            
            <Grid item md={12}>
              {
                (shownNum <= menuCount) ? <Button fullWidth variant="outlined" color="inherit" onClick={clickShow}>Load More</Button> 
                : <Typography sx={{textAlign:'center'}}>No more restaurants available</Typography>
              }
            </Grid>



            {/* <Grid item>
            <Card variant="outlined" sx={{ maxWidth: 300}}>
              <CardMedia
                component="img"
                height="140"
                image={TestImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kelvin's Cat Cafe
                  <Rating name="read-only" value={4.7} readOnly size='small' precision={0.1}/>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActionArea className="123" sx={{padding:'10px'}}>
                <Box sx={{width:'100%'}}>
                  <Button variant="outlined" color="inherit" sx={{width:'100%'}}>Order</Button>
                </Box>
              </CardActionArea>
            </Card>
            </Grid> */}

            
          </Grid>
        </CardContent>
      </Card>
  )
}
