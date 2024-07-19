import React, { useState, useContext ,useEffect } from 'react';
import { createProduct,findAllCategories } from '../../api/api'; // Adjust the import path
import styles from './styles.module.scss';
import { CategoryContext } from '../context/CategoryContext';

const ProductModal = ({ show, onClose, reloadItems }) => {
  const { category, setCategory } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    image: '',
    instantDelivery: false,
  });
  const [error, setError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanedData = {
        ...formData,
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
      };

      if (!cleanedData.categoryId) {
        setError('Category is required.');
        return;
      }

      await createProduct(cleanedData);
      onClose(); // Close the modal after successful creation
      reloadItems(); // Refresh products list
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Failed to create product:', error.response.data.message);
      } else {
        console.error('Failed to create product:', error.message);
      }
    }
  };

  useEffect(() => {
    if (show) {
      findAllCategories()
        .then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form} >
          <div className={styles.formField}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label>Category:</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleFormChange}
              required
            >
              <option value="">Select a category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formField}>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.formField}>
            <label>Instant Delivery:</label>
            <input
              type="checkbox"
              name="instantDelivery"
              checked={formData.instantDelivery}
              onChange={(e) => setFormData({ ...formData, instantDelivery: e.target.checked })}
            />
          </div>
          <button className={styles.submitButton} type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
