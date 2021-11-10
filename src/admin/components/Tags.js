import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, Box, Typography, TextField, Button, Divider} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { checkTag, deleteTag, postNewTag, retrieveTags } from '../admin_controller';

export default function Tags() {
  // Usestate for page controls
  const [selectedTag, setSelectedTag] = useState('');    
  const [openDialog, setOpenDialog] = useState(false);

  // Creating allSubUsers to store original array
  // I changed the userData to store this one cos the subUserArray
  // I transformed it to show here in this page only
  const [tags, setTags] = useState([]);

  // Essential page functions
  // UseEffect to trigger load of all tags
  useEffect(() => {
    // ASYNC FUNCTION to trigger TAGS settings!
    retrieveTags()
      .then((response) => {
        setTags(response);
        setTags(response);
      })
  }, []);

  // STATES USED FOR ADDING TO THE DATABASE
  const [newTag, setNewTag] = useState('');

  // Function to add the tag to the database
  async function addTag () {
    try {
      const response = await postNewTag(newTag);
      
      const { api_msg } = response;

      if(api_msg === 'success') {
        alert(newTag + " has been successfully added!");

        retrieveTags()
          .then((response) => {
            setTags(response);
          });
        
        setNewTag('');
      }
      else {
        alert(api_msg);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  // HANDLING DELETE OF A TAG
  // This following function is for deleting the user
  const handleOpenDialog= () => {   
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    deleteTag(selectedTag)
      .then((response) =>{
        if (response.api_msg === "success") {
          handleCloseDialog();
          alert("Delete Tag successful!"); 

          // RELOAD TAGS
          retrieveTags()
            .then((response) => {
              setTags(response);
            });
        }
        else {
          handleCloseDialog();
          alert("something went wrong!");
        }
      })
  }

  const verifyTagUsage = (selectTag) => {
    checkTag(selectTag)
      .then((response) => {
        if (response.api_msg === "not found") {
          handleOpenDialog();
          setSelectedTag(selectTag)
        }
        else if (response.api_msg === "exist") {
          alert("Tag is currently in use and cannot be deleted!");
        }
      })
  }

  // Loading the DataGrid headers
  const columns = [
    { field: 'tag', headerName: 'Tag Name', width: 300 },
    // { field: 'tag_desc', headerName: 'Tag Description (if any)', width: 800 },
    {
      field: " ",
      renderCell: (cellValues) => {
        return (
          <Button
            id={cellValues.tag}
            variant="outlined"
            color="error"
            fullWidth
            onClick={(event) => {
              console.log(cellValues);
              setSelectedTag(cellValues.row.tag);
              verifyTagUsage(cellValues.row.tag);
            }}
            // onClick={handleOpenDialog}
          >
            Remove
          </Button>
        );
      }
    }
  ];

  return <>
    <Card variant="outlined" sx={{padding:'5px', borderRadius:'10px'}}>
      <CardHeader title="Category Tags Management" />
      <CardContent >
        <Box textAlign="center" margin="10px auto 30px">
          <Typography variant="h6">
            Add New Tag
          </Typography> 
          <TextField sx={{width:'40%', margin:'15px auto'}} 
            value={newTag}
            id="filled-basic" 
            label="Tag Name" 
            variant="filled" 
            size="small" 
            onChange={(event) => {
              setNewTag(event.target.value);
            }}
          />
          <Typography variant="h6">
          <Button sx={{width:'30%'}}
            variant="outlined" 
            color="inherit" 
            onClick={addTag}
          >
            Confirm Add Tag
          </Button>
          </Typography> 
        </Box>

        <Divider variant="middle"/>
        <Box textAlign="center" margin="10px auto 30px">
          <Typography variant="h6">
            All Existing Tags
          </Typography> 
        </Box>

        <Box textAlign="center" height="400px" width="500px" sx={{'.MuiDataGrid-columnHeaderWrapper': {backgroundColor:'#eeeeee'}}} >
          <DataGrid 
            rows={tags} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
            // editRowsModel={editRowsModel}
            // onEditRowsModelChange={handleEditRowsModelChange}
          />
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm item deletion?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Confirm delete '{selectedTag}'?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmDelete} variant="outlined" color="inherit">Confirm</Button>
              <Button onClick={handleCloseDialog} variant="outlined" color="error">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </CardContent>
    </Card>
  </>
}
