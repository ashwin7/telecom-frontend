import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios'; // for making API requests

const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    id: '',
    registrationDate: new Date().toISOString().slice(0, 10),
    mobileNumber: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/customers', formData);
      console.log('Data submitted successfully:', response.data);
      handleClose(); // Close dialog on success
      setFormData({ // Clear form data
        name: '',
        dob: '',
        email: '',
        id: '',
        registrationDate: new Date().toISOString().slice(0, 10),
        mobileNumber: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <Button style={{marginTop: "20px"}} variant="contained" onClick={handleOpen}>
        Register New Customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Customer Registration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth (YYYY-MM-DD)"
            type="date"
            fullWidth
            variant="standard"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }} // Adjust label behavior
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="id"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="mobileNumber"
            label="Mobile Number (10 digits)"
            type="number"
            fullWidth
            variant="standard"
            value={formData.mobileNumber}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }} // Limit input to 10 digits
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;