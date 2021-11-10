import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box, CardActionArea } from '@mui/material'
import { CardMedia, Button, Typography } from '@mui/material'
import { Rating } from '@mui/material'
import { Grid } from '@mui/material'
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

export default function BrowseTopRestaurant({restData}) {
  const [shownNum, setShownNum] = useState(5);
  const menuCount = restData.length;

  const clickShow = () => {
    setShownNum(shownNum + 5);
  };

  return <>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Browse Restaurants - Top Picks" />
      <CardContent >
        <Grid 
          container
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 15}}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >

          {restData.slice(0, shownNum).map(rest => {
            return <><Grid item xs={4} sm={4} md={4} lg={3} xl={3} key={restData.indexOf(rest)}>
              {/* Card generation for restaurant */}
              <Card variant="outlined" sx={{ maxWidth: 300, height:'300px', mb:'20px'}}>
              <CardActionArea component={ Link } to={`/customer/restaurantdetails/${rest.restaurant_ID}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={rest.rest_banner}
                />
                <CardContent >
                  <Box height="200px">
                    <Typography gutterBottom variant="h6" component="div" noWrap >
                    {rest.restaurant_name}
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
              </>
            })}
          
          <Grid item md={12}>
            {
              (shownNum <= menuCount) ? <Button fullWidth variant="outlined" color="inherit" onClick={clickShow}>Load More</Button> 
              : <Typography sx={{textAlign:'center'}}>No more restaurants available</Typography>
            }
          </Grid>            
        </Grid>
      </CardContent>
    </Card>
  </>
}
