import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Box, CardMedia, Typography, Divider, Grid, CardActionArea, IconButton, Tooltip } from '@mui/material'
import TestImage from '../../assets/temp/eg-biz1.png'
import { Rating } from '@mui/material'
import test from '../../assets/icon-profile.png'
import { ButtonBase } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Modal } from '@mui/material'
import { Button } from '@mui/material'

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
export default function RetaurantResDetails() {
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

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
                    <Button variant="outlined" sx={{marginRight:'20px'}}>ORDER Delivery</Button>
                    <Button variant="outlined">Reservation</Button>
                </Box>
                <Box width='100%' alignSelf="flex-end" >
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

            {/* RESERVE MODAL */}
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


          </Box>
        </CardContent>
      </Card>
  )
}
