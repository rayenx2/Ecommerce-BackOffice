import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ViewOrderModal = ({ open, onClose, order }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="view-order-modal-title"
      aria-describedby="view-order-modal-description"
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
        <Typography id="view-order-modal-title" variant="h6" component="h2">
          Order Details
        </Typography>
        <Typography id="view-order-modal-description" sx={{ mt: 2 }}>
          <strong>Email:</strong> {order.email}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>User Name:</strong> {order.userName}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Amount:</strong> {order.amount.toLocaleString('en-US')}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Status:</strong> {order.status || 'Pending'}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Products:</strong> {order.products.map((product) => product.title).join(', ')}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewOrderModal;
