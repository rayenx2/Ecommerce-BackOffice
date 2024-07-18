"use client"
import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, createProduct } from '../../api/api'; // Adjust import path as per your project structure
import ProductsList from '../ProductsList';
import { MdReplay } from 'react-icons/md';
import styles from './styles.module.scss';
import { IoAddCircle } from "react-icons/io5";
import { CategoryContext } from '../context/CategoryContext';


const Products = () => {
  const{category,setCategory}=useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    image: '',
    instantDelivery: false,
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
      const cleanedData = {
        ...newProductData,
        categoryId: newProductData.categoryId ? parseInt(newProductData.categoryId) : undefined,
      };

      if (!cleanedData.categoryId) {
        setError('Category is required.');
        return;
      }

      console.log(cleanedData)

      const createdProduct = await createProduct(cleanedData);
      console.log('Product created:', createdProduct);
      setShowForm(false); // Hide form after successful creation
      reloadItems(); // Refresh products list
      setError(''); // Reset error state
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Failed to create product:', error.response.data.message);
        // Update state or show error message to user
      } else {
        console.error('Failed to create product:', error.message);
        // Handle generic error state or notify user
      }
    }
  };

  const handleFormChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log({ name, value})
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call createProduct with formData
    console.log('Form submitted with data:', formData);
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
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleFormChange}
              required
            >
              <option value="">Select a category</option>
              {category.map(cat => (
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
