import React from 'react'
import { Card, CardHeader, CardContent, Box } from '@mui/material'

export default function ApproveRest() {
  //Mock Restaurant Details
  const restDetails = [
    {
      'rest_name': 'restaurant 1',
      'uen': 123456,
      'rest_email': 'email312.gmail.com'
    },
    {
      'rest_name': 'restaurant 2',
      'uen': 12312343,
      'rest_email': 'email312.gmail.com'
    },
    {
      'rest_name': 'restaurant 3',
      'uen': 32143,
      'rest_email': 'email312.gmail.com'
    },
    {
      'rest_name': 'restaurant 4',
      'uen': 321,
      'rest_email': 'email312.gmail.com'
    },
    {
      'rest_name': 'restaurant 5',
      'uen': 23155324,
      'rest_email': 'email312.gmail.com'
    },
    {
      'rest_name': 'restaurant 6',
      'uen': 123123554,
      'rest_email': 'email312.gmail.com'
    },
  ];
  return (
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
        <CardHeader title="Pending Restaurant Registration" />
        <CardContent >
          <Box > 
             
          </Box>
        </CardContent>
      </Card>
  )
}
