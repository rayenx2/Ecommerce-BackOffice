import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { updateOrderStatus} from '../../../api/api'

const StatusUpdateModal = ({ open, onClose, order, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(order.status || 'pending'); // Default to 'pending' if no status

  const handleUpdateStatus = async () => {
    try {
      // Call the API to update the order status
      // Assuming there's an updateOrderStatus function in your API module
      await updateOrderStatus(order.id, newStatus);
      onUpdateStatus(order.id, newStatus); // Update frontend state with new status
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error as needed (e.g., show an error message)
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="status-update-modal-title"
      aria-describedby="status-update-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="status-update-modal-title" variant="h6" component="h2">
          Update Order Status
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Select New Status:
          </Typography>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="not_delivered">Not Delivered</MenuItem>
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleUpdateStatus} sx={{ mr: 2 }}>
            Update Status
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusUpdateModal;
