import React from 'react'
import ViewMenuList from '../../../components/rest-view-menu/ViewMenuList';
import { Button, CardContent, CardHeader, Typography } from '@mui/material'
import { useHistory } from 'react-router';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card } from '@mui/material';
import { Link } from "react-router-dom";
import { Box } from '@mui/system';

export default function Editmenu({menuData, itemSelected, setItemSelected}) {

  const history = useHistory()

  function additem(){
    let path = "/additem";
    history.push(path);
  }

  return (
    <Box>
      {/* <Card variant="outlined" sx={{padding:'10px', borderRadius:'20px'}}> */}
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Edit Menu" />
        <CardContent >
        <Box display='flex' flexDirection="column" sx={{margin:'10px auto', width:'80%'}}> 
            <Box alignSelf='flex-end'>
              <Button variant="outlined" color="inherit" component={Link} to="/generalmanager/additem" >ADD ITEM</Button>
            </Box>
            <Box alignSelf='flex-start'>
              <Typography sx={{textAlign: 'left', display:'inline-block'}}><FiberManualRecordIcon color="success" sx={{ fontSize: 12, alignSelf:'flex-start'}} /> Menu Items Currently Active</Typography>
            </Box>
        </Box>
        <Box sx={{margin:'10px auto', width:'80%'}}>
            {
              <ViewMenuList menu_items={menuData} itemSelected={itemSelected} setItemSelected={setItemSelected} />
            }
        </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
