import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, Select, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

const plans = [
  { name: 'Platinum365', cost: 499, validity: 365 },
  { name: 'Gold180', cost: 299, validity: 180 },
  { name: 'Silver90', cost: 199, validity: 90 },
];

const NewPlanFormDialog = ({ customerID, isFormOpen, onClose, formLabel, planData }) => {
  const [formData, setFormData] = useState(planData);

  const [planOptions, setPlanOptions] = useState([]);

  useEffect(() => {
    if (isFormOpen) {
      //setFormData({ ...formData, planName: plans[0].name }); // Set default plan on open
      setPlanOptions(plans.map((plan) => (
        <MenuItem key={plan.name} value={plan.name}>
          {plan.name}
        </MenuItem>
      )));
    }
  }, [isFormOpen]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name === ":rb:") {
      name = "planStatus";
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePlanChange = (event) => {
    const selectedPlan = plans.find((plan) => plan.name === event.target.value);
    setFormData({
      ...formData,
      planName: event.target.value,
      planCost: selectedPlan.cost,
      validity: selectedPlan.validity,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/customers/${customerID}/plan`, formData);
      console.log('Plan assigned successfully:', response.data);
      onClose(); // Close dialog on success
    } catch (error) {
      console.error('Error assigning plan:', error);
    }
  };

  return (
    <Dialog open={isFormOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{formLabel}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <FormLabel>Plan Name</FormLabel>
          <Select value={formData.planName} onChange={handlePlanChange} label="Plan Name">
            {planOptions}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="planCost"
          label="Plan Cost"
          type="number"
          fullWidth
          variant="standard"
          value={formData.planCost}
          onChange={handleChange}
          disabled // Disable cost editing (derived from plan selection)
        />
        <TextField
          margin="dense"
          name="validity"
          label="Validity (Days)"
          type="number"
          fullWidth
          variant="standard"
          value={formData.validity}
          onChange={handleChange}
          disabled // Disable validity editing (derived from plan selection)
        />
        <FormControl fullWidth>
          <FormLabel>Plan Status</FormLabel>
          <RadioGroup row value={formData.planStatus} onChange={handleChange}>
            <FormControlLabel value="Active" control={<Radio />} label="Active" />
            <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Assign Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlanFormDialog;