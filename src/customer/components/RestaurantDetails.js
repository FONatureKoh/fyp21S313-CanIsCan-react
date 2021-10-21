import React from 'react'
import { Card, CardHeader, CardContent, Box, CardMedia, Typography, Divider, Grid, CardActionArea, IconButton, Tooltip } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import test from '../../assets/icon-profile.png'
import { ButtonBase } from '@mui/material'
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export default function RetaurantDetails() {
  return (
      <Card variant="outlined" sx={{ borderRadius:'10px'}}>
        <CardMedia sx={{height:'300px' }}
          component="img"
          image={TestImage}
        />

        <CardContent >
          <Box sx={{width: "80%", margin: '10px auto'}}> 
            {/* HEADER BOX - REST DETAILS HERE */}
            <Box display="flex" flexDirection="row">
              <Box width="70%">
                <Typography variant="h4"  sx={{}}>
                  Test
                </Typography>
                <Typography sx={{fontSize:'small', padding:'10px 0px'}}>
                  <Rating name="read-only" value={4.2} readOnly size='small' precision={0.1}/> 4.2 / 5
                </Typography>
              </Box>
                
              <Box width='30%' alignSelf="flex-end" textAlign='right'>
                <Typography>
                <Tooltip title="Directions">
                  <IconButton sx={{margin:'0px 5px 5px'}}>
                    <DirectionsOutlinedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Information">
                  <IconButton sx={{margin:'0px 5px 5px'}}>
                    <HelpOutlineOutlinedIcon/>
                  </IconButton>
                </Tooltip>
                </Typography>
              </Box>
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
                  
                <ButtonBase sx={{display:'block', textAlign:'initial', width:'100%'}}>
                <Card sx={{ display: 'flex', width:'100%'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                  <CardContent sx={{ flex: '1 0 auto'}}>
                    <Typography component="div" variant="h6">
                      Fries
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      Deep Fried Fries with some cheese cheese cheese sauce.
                    </Typography>
                    <Typography variant="subtitle1">
                     Price: $ 3.20
                    </Typography>
                  </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, margin:'1%'}}
                    image={test}
                    alt="fooditemname"
                  />
                </Card>
                </ButtonBase>
                </Grid>
                {/* END OF MENU ITEM */}

                {/* EACH MENU ITEM */}
                <Grid item xs={12} sm={12} md={6}>
                  <ButtonBase sx={{display:'block', textAlign:'initial', width:'100%'}}>
                  <Card sx={{ display: 'flex', width:'100%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                    <CardContent sx={{ flex: '1 0 auto'}}>
                      <Typography component="div" variant="h6">
                        Fries
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        Deep Fried Fries with some cheese cheese cheese sauce.
                      </Typography>
                      <Typography variant="subtitle1">
                       Price: $ 3.20
                      </Typography>
                    </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151, margin:'1%'}}
                      image={test}
                      alt="fooditemname"
                    />
                  </Card>
                  </ButtonBase>
                  </Grid>
                  {/* END OF MENU ITEM */}

                  
                {/* EACH MENU ITEM */}
                <Grid item xs={12} sm={12} md={6}>
                  <ButtonBase sx={{display:'block', textAlign:'initial', width:'100%'}}>
                  <Card sx={{ display: 'flex', width:'100%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width:'80%'}}>
                    <CardContent sx={{ flex: '1 0 auto'}}>
                      <Typography component="div" variant="h6">
                        Fries
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        Deep Fried Fries with some cheese cheese cheese sauce.
                      </Typography>
                      <Typography variant="subtitle1">
                       Price: $ 3.20
                      </Typography>
                    </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151, margin:'1%'}}
                      image={test}
                      alt="fooditemname"
                    />
                  </Card>
                  </ButtonBase>
                  </Grid>
                  {/* END OF MENU ITEM */}
              </Grid>
            </Box>

          </Box>
        </CardContent>
      </Card>
  )
}
