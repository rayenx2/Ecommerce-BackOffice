import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, findAllCategories } from '../../api/api'; // Adjust import path as per your project structure
import ProductsList from '../ProductsList';
import ProductModal from '../ProductModal';
import { MdReplay } from 'react-icons/md';
import styles from './styles.module.scss';
import { IoAddCircle } from "react-icons/io5";
import { CategoryContext } from '../context/CategoryContext';

const Products = () => {
  const { category , setCategory} = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Function to fetch products
  const reloadItems = () => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  // Function to fetch categories
  const reloadCategories = () => {
    findAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    reloadItems();
  }, []);

  // Function to delete a product
  const deleteElement = (id) => {
    deleteProduct(id)
      .then((data) => {
        if (data.status === 200) {
          reloadItems(); // Refresh products after successful deletion
        }
      })
      .catch((error) => {
        console.error(`Error deleting product with ID ${id}:`, error);
      });
  };

  return (
    <div className={styles.main}>
      <h1>Products</h1>
     

      <button className={styles.refresh} onClick={() => setShowForm(true)}>
        <IoAddCircle /> Add New Product
      </button>

      <ProductModal show={showForm} onClose={() => setShowForm(false)} reloadItems={reloadItems} />

      <div className={styles.container}>
        <ul className={styles.list}>
          {products.map((item) => (
            <ProductsList
              key={item.id}
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
