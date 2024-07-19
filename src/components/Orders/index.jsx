import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OrderModal from '../OrderModal/index'; // Adjust import path as needed
import { getOrders } from '../../api/api'; // Adjust import path as needed

const columns = [
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'userName', label: 'User Name', minWidth: 150 },
  { id: 'amount', label: 'Amount', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'products', label: 'Products', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
];

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    fetchOrders(); // Refresh orders after modification or deletion
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h1>Orders</h1>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={order.id} onClick={() => handleOpenModal(order)}>
                {columns.map((column) => {
                  const value = order[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'status' ? (
                        <span style={{ color: getStatusColor(value) }}>{getStatusText(value)}</span>
                      ) : column.id === 'products' ? (
                        value.map((product) => product.title).join(', ')
                      ) : (
                        column.format && typeof value === 'number' ? column.format(value) : value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showModal && (
        <OrderModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
          onDeleteOrder={handleDeleteOrder}
        />
      )}
    </Paper>
    </div>
  );
};

// Helper function to get status text based on delivery status
const getStatusText = (deliveryStatus) => {
  if (deliveryStatus === 'delivered') {
    return 'Delivered';
  } else if (deliveryStatus === 'pending') {
    return 'Pending';
  } else {
    return 'Not Delivered';
  }
};

// Helper function to get status color based on delivery status
const getStatusColor = (deliveryStatus) => {
  if (deliveryStatus === 'delivered') {
    return 'green';
  } else if (deliveryStatus === 'pending') {
    return 'orange';
  } else {
    return 'red';
  }
};

export default Order;
