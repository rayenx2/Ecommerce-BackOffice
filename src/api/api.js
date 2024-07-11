import axios from 'axios';


const API_URL = 'http://localhost:3002'; 
const axiosClient = axios.create({
  baseURL: API_URL,
  
});

export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post('/products', productData);
    console.log({ response})

    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// export const updateProduct = async (productId, updatedProductData) => {
//   try {
//     const response = await axiosClient.patch(`/products/${productId}`, updatedProductData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating product with ID ${productId}:`, error);
//     throw error;
//   }
// };

export const updateProduct = async (productId, updatedProductData) => {
    
    try {
      const response = await axiosClient.patch(`/products/${productId}`, updatedProductData);
      
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  };

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosClient.get('/orders'); // Adjust the URL as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
