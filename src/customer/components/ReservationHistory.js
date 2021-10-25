import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Box, Button, Typography, Grid, Modal, CardMedia, IconButton, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TestImage from '../../assets/temp/eg-biz1.png'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

const themes = {
  textHeader: {
    fontSize:'1 0px', 
    fontWeight:'bold', 
    mt: '20px',
    mb: '10px'
  }
};

const apiKey = "AIzaSyCZltDQ_C75D3csUGTpHRpfAJhZuPP2bqM"
export default function ReservationHistory() {
  const [buttonTab, setButtonTab] = useState(1);
  
  //MODAL CONTROLS - DIRECTIONS / INFO
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);

  //GET STATIC MAP
  function getMap(postal){
    const maplink = `http://maps.google.com/maps/api/staticmap?center=${postal}&zoom=17&size=400x300&maptype=roadmap&key=${apiKey}&region=SG&markers=color:red%7C${postal}&scale=2`;
    return maplink;
  }

  return (
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Reservation History" />
        <CardContent >
          <Box sx={{margin:'0px 10px 20px', textAlign:'right'}}>
            <Button variant="outlined" color="inherit" sx={{marginRight:'20px'}} onClick={()=> setButtonTab(1)}>upcoming reservation</Button>
            <Button variant="outlined" color="inherit" onClick={()=> setButtonTab(2)}>Past reservations</Button>
          </Box>

          {
            buttonTab === 1 ? (
              <>
              <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px', width:'80%', margin:'0px auto'}}>
                <CardHeader title="Upcoming Reservation" sx={{textAlign:"center"}}/>
                <CardContent >
                <Box width="80%" sx={{margin:'0px auto', textAlign:"center"}}> 
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', }}>
                    Reservation at
                  </Typography>
                  <Typography variant="subtitle1" >
                    Restaurant Name
                  </Typography>
                  <Typography variant="subtitle1" >
                    <Tooltip title="Restaurant Information">
                      <IconButton aria-label="info" onClick={handleOpenInfo}>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Calendar Invite">
                      <IconButton aria-label="calendar">
                        <InsertInvitationIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'30px' }}>
                    Reservation Details
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Date
                      </Typography>
                      <Typography variant="subtitle1" >
                        Date placeholder
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Typography variant="subtitle1"  sx={{fontSize:'1 0px', fontWeight:'bold', mt:'20px' }}>
                        Reservation Time
                      </Typography>
                      <Typography variant="subtitle1" >
                        Time slot placeholder
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* CONTAINER FOR BUTTONS */}
                  <Grid container sx={{mt:'50px'}}>
                    <Grid item xs={12} sm={12} md={3}>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Button color="inherit" variant="outlined">
                        Edit Reservation
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Button color="error" variant="outlined">
                        Cancel Reservation
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                    </Grid>
                  </Grid>
                </Box>
                </CardContent>
              </Card>
              </>
            ) : (
              <>
              </>
            )
          }

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
        </CardContent>
      </Card>
  )
}
