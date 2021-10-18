import React from 'react'
import { Card, CardHeader, CardContent, Box, CardMedia, Typography, Divider, Grid } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import test from '../../assets/icon-profile.png'

export default function RetaurantDetails() {
  return (
      <Card variant="outlined" sx={{ borderRadius:'10px'}}>
        <CardMedia sx={{height:'300px'}}
          component="img"
          image={TestImage}
        />

        <CardContent >
          <Box sx={{width: "80%", margin: '10px auto'}}> 
            {/* HEADER BOX - REST DETAILS HERE */}
            <Box>
              <Typography variant="h4" sx={{}}>
                Test
              </Typography>
              <Typography sx={{fontSize:'small', padding:'10px 0px'}}>
                <Rating name="read-only" value={4.2} readOnly size='small' precision={0.1}/> 4.2 / 5
              </Typography>
            </Box>
            <Divider/>

            
            {/* MENU BOX - CONTAINER FOR EACH MENU OFFERED BY THE REST */}
            <Box>
              <Typography variant="h4" sx={{padding:'20px 0px'}}>
                Menu Name
              </Typography>

              <Grid 
                container
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 12, md: 12 }}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >

                {/* EACH MENU ITEM */}
                <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ display: 'flex', width:'100%'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                  <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                      Fries
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Deep Fried Fries
                    </Typography>
                  </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, alignSelf:'flex-end'}}
                    image={test}
                    alt="Live from space album cover"
                  />
                </Card>
                </Grid>
                {/* END OF MENU ITEM */}

                {/* EACH MENU ITEM */}
                <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ display: 'flex', width:'100%'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                  <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                      Fries
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Deep Fried Fries
                    </Typography>
                  </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, alignSelf:'flex-end'}}
                    image={test}
                    alt="Live from space album cover"
                  />
                </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ display: 'flex', width:'100%'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                  <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                      Fries
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Deep Fried Fries
                    </Typography>
                  </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, alignSelf:'flex-end'}}
                    image={test}
                    alt="Live from space album cover"
                  />
                </Card>
                </Grid>
              </Grid>
            </Box>

          </Box>
        </CardContent>
      </Card>
  )
}
