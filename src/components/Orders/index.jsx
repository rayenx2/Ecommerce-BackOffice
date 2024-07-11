import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getOrders } from '../../api/api'; // Adjust import path as needed

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.main}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderItem}>
          <li className={styles.listItem}>Order ID: {order.id}</li>
          <li className={styles.listItem}>Email: {order.email}</li>
          <li className={styles.listItem}>User Name: {order.userName}</li>
          <li className={styles.listItem}>Amount: {order.amount}</li>
          <li className={styles.listItem}>
            Products:
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          </li>
          
          </div>
       
      ))}
    </div>
  );
};

export default Order;
