import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import style from "./user.module.css"; // Ensure your CSS file exists

const UsersPage = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [open, setOpen] = useState(false); // State for modal open/close
  const [userIdToDelete, setUserIdToDelete] = useState(null); // ID of the user to delete
  const paginationModel = { page: 0, pageSize: 10 };

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    // Implement edit functionality, e.g., redirect to an edit page
  };

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setOpen(true); // Open modal on delete button click
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setUserIdToDelete(null); // Clear the ID
  };

  const handleDeleteConfirm = async () => {
    console.log('Delete user with ID:', userIdToDelete);
    try {
      const response = await fetch(`http://localhost:8080/join/signup-popup/${userIdToDelete}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      handleClose(); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Define columns according to the formatted data structure
  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'emailID', headerName: 'Email', width: 300 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 300
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" color="primary" onClick={() => handleEdit(params.row.id)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row.id)} // Open modal on delete click
            style={{ marginLeft: 5 }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/join/signup-popup'); // Adjust URL based on your API
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();

        const formattedData = data.map((user) => ({
          id: user._id, // Ensure the field exists in your user model
          fullName: user.name,
          createdAt: user.createdAt, // Keep the original string for mapping
          emailID: user.email
        }));
        console.log(formattedData, "Formatted user data");

        setUsers(formattedData); // Correctly using setUsers to update state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={style.container}>
      <Typography variant="h5" className={style.title}>
        Users List
      </Typography>
      <Paper className={style.dataGridContainer}>
        <DataGrid
          rows={users}
          columns={columns}
          paginationModel={paginationModel} // Update pagination state
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent:"center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyhbkbAaut1zal_92hOuwbfVT6tNh5n60Vhw&s"
              alt="Warning"
              style={{ width: 100, height: 100}}
            />
          </div>
          <DialogTitle style={{ display: 'flex', justifyContent:"center",color:"red"}}>Warning!!!</DialogTitle>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
