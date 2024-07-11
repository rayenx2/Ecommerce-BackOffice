"use client"
import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, createProduct } from '../../api/api'; // Adjust import path as per your project structure
import ProductsList from '../ProductsList';
import { MdReplay } from 'react-icons/md';
import styles from './styles.module.scss';
import { IoAddCircle } from "react-icons/io5";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: '',
  });

  // Function to fetch products
  const reloadItems = () => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleCreateProduct = async (newProductData) => {
    try {
      console.log(newProductData)
      const createdProduct = await createProduct(newProductData);
      console.log('Product created:', createdProduct);
      // Optionally update state or perform other actions upon successful creation
      setShowForm(false); // Hide form after successful creation
      reloadItems(); // Refresh products list
    } catch (error) {
      // Handle error state or notify user about the error
      console.error('Failed to create product:', error);
    }
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call createProduct with formData
    handleCreateProduct(formData);
  };
  


  useEffect(() => {
    reloadItems();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to delete a product
  const deleteElement = (id) => {
    deleteProduct(id).then((data) => {
      if (data.status === 200) {
        reloadItems(); // Refresh products after successful deletion
      }
    }).catch(error => {
      console.error(`Error deleting product with ID ${id}:`, error);
    });
  };

  return (
    <div className={styles.main}>
      <h1>Products</h1>
      <button className={styles.refresh} onClick={reloadItems}>
        <MdReplay /> Refresh
      </button>

      <button className={styles.refresh} onClick={() => setShowForm(true)}>
        <IoAddCircle /> Add New Product
      </button>

      
      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
             
            />
          </div>
          <div className={styles.formField}>
            <label>Image URL:</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleFormChange}
             
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <div className={styles.container}>
        <ul className={styles.list}>
          {products.map((item) => (
            <ProductsList
              key={item.id} // Use a unique key for each list item
              item={item}
              reloadItems={reloadItems}
              deleteElement={deleteElement}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
