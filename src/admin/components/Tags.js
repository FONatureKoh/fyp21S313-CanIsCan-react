import React from 'react'
import { Card, CardHeader, CardContent, Box, Typography, TextField, Button, Divider} from '@mui/material'

export default function Tags() {
  return (
      <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Category Tags Management" />
        <CardContent >
          <Box textAlign="center" margin="10px auto 30px">
            <Typography variant="h6">
              Add New Tag
            </Typography> 
            <TextField sx={{width:'40%', margin:'15px auto'}} 
              id="filled-basic" 
              label="Tag Name" 
              variant="filled" 
              size="small" 
            />
            <Typography variant="h6">
            <Button sx={{width:'30%'}}
              variant="outlined" 
              color="inherit"  
            >
              Confirm Add Tag
            </Button>
            </Typography> 
          </Box>

          <Divider variant="middle"/>

          <Box textAlign="center" margin="15px auto">
            <Typography variant="h6">
              Existing Tags
            </Typography>
          </Box>
        </CardContent>
      </Card>
  )
}
