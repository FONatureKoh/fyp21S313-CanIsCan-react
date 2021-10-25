import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Box, CardMedia, Typography, Divider, Grid, CardActionArea, Button, IconButton, Tooltip } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import test from '../../assets/icon-profile.png'
import { ButtonBase } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Modal } from '@mui/material'
import { format } from 'date-fns';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Landscape } from '@mui/icons-material'

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"

export default function RetaurantDetails() {
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  //MODAL CONTROLS - REVIEWS
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  //MODAL CONTROLS - REVIEWS
  const [openReserve, setOpenReserve] = useState(false);
  const handleOpenReserve= () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

  // CALENDAR TESTING
  const [value, setValue] = React.useState(new Date());
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);

  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }
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
              <Box width="55%">
                <Typography variant="h4"  sx={{}}>
                  Test
                </Typography>
                <Typography sx={{fontSize:'small', padding:'10px 0px'}}>
                  <Rating name="read-only" value={4.2} readOnly size='small' precision={0.1}/> 4.2 / 5
                </Typography>
              </Box>
              
              <Box width='45%' textAlign='right' >
                <Box Box width='100%' >
                    <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}}>ORDER Delivery</Button>
                    <Button variant="outlined" color="inherit" onClick={handleOpenReserve}>Reserve Table</Button>
                </Box>
                <Box width='100%' alignSelf="flex-end" sx={{mt:'3px'}} >
                  <Typography>
                  <Tooltip title="Information">
                    <IconButton sx={{margin:'0px 5px 5px' }} onClick={handleOpenInfo}>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Reviews">
                    <IconButton sx={{margin:'0px 5px 5px'}} onClick={handleOpenReview}>
                      <ReviewsOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                  </Typography>
                </Box>
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

            {/* INFO MODAL */}
            <Modal
              open={openInfo}
              onClose={handleCloseInfo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"600px",
                maxHeight:'70%',}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="subtitle2">Tags</Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" sx={{mt:'20px'}}>
                    <Box width='50%' padding="10px 20px">
                      <Typography variant="h6">
                        Address
                      </Typography>
                      <Typography variant="subtitle2">
                        930 Hougang Street 91
                      </Typography>
                      <Typography variant="subtitle2">
                        S (530930)
                      </Typography>
                      <Typography variant="h6" sx={{mt:'10px'}}>
                        Operating Hours
                      </Typography>
                      <Typography variant="subtitle2">
                        Time to time
                      </Typography>
                    </Box>
                    <Box alignContent="flex-end">
                    <img width="300px" height="200px" src={getMap(530930)}/>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Modal>
            {/* END OF INFO MODAL */}

            {/* REVIEW MODAL */}
            <Modal
              open={openReview}
              onClose={handleCloseReview}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"50%",
                maxHeight:'70%',}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="subtitle2">Reviews</Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" width="60%" height="100px" border="1px solid black" margin="10px auto" padding="20px">
                    <Typography variant="h6">Title</Typography>
                    <Typography><Rating value={3} size="small"/></Typography>
                    <Typography variant="subtitle2">Information about the review</Typography>
                    
                    <Typography variant="subtitle" fontSize="12px" alignSelf='flex-end'>Reviewed by: Kelvin K.</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Modal>
            {/* END OF REVIEW MODAL */}

            {/* RESERVATION MODAL */}
            <Modal
              open={openReserve}
              onClose={handleCloseReserve}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card variant="outlined" sx={{ position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width:"50%",
                maxHeight:'70%',
                overflow:'auto'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={TestImage}
                />
                <CardContent >
                  <Box textAlign="center">
                    <Typography variant="h5">Restaurant Name</Typography>
                    <Typography variant="subtitle2">Select date / timeslot</Typography>
                  </Box>
                  <Box textAlign="center" sx={{mt:'20px', mb:'10px'}}>
                  <Typography variant="h6">You have selected</Typography>
                  <Typography variant="subtitle1">{format(value, 'dd MMMM yyyy')}</Typography>
                  <Typography variant="subtitle1">TIME</Typography>
                  </Box>
                  
                  <Divider variant="middle"/>

                  <Grid container>
                    <Grid item md={6} sm={12} xs={12} sx={{mt:'15px', minWidth:'300px'}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          openTo="day"
                          showToolbar={false}
                          orientation="landscape"
                          minDate={startDate}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item md={6} sm={12} xs={12} sx={{mt:'15px'}}>
                      <Box sx={{m:'20px auto', width:'100%'}}>
                        Slots
                        <Grid container>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" disabled variant='contained' >13:30</Button>
                          </Grid>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" variant='contained' >14:30</Button>
                          </Grid>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" variant='contained' >15:30</Button>
                          </Grid>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" variant='contained' >16:30</Button>
                          </Grid>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" variant='contained' >17:30</Button>
                          </Grid>
                          <Grid item md={3} sm={4} xs={6} sx={{mt:'15px'}}>
                            <Button color="inherit" variant='contained' >18:30</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                  </Grid>
                  <Box display="flex">
                    <Box sx={{mt:'0px auto', width:'60%'}}>
                    
                    </Box>
                    
                    <Divider variant="middle" />
                    
                    
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      sx={{ mr: 1 }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button color="inherit" variant="outlined">
                      NEXT
                    </Button>
                  </Box>
                  
                </CardContent>
              </Card>
            </Modal>
            {/* END OF RESERVATION MODAL */}

          </Box>
        </CardContent>
      </Card>
  )
}
