import axios from 'axios';


const API_URL = 'http://localhost:3002'; 
const axiosClient = axios.create({
  baseURL: API_URL, // Adjust to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post('/products', productData);
    console.log('Product created:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error creating product:', error.response.data.message);
      throw new Error(error.response.data.message); // Rethrow the error with the server-side message
    } else {
      console.error('Error creating product:', error.message);
      throw new Error('Failed to create product. Please try again later.'); // Handle generic error
    }
  }
};

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

// export const createProduct = async (productData) => {
//   try {
//     const response = await axiosClient.post('/products', productData);
//     console.log('Product created:', response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       console.error('Error creating product:', error.response.data.message);
//       throw new Error(error.response.data.message); // Rethrow the error with the server-side message
//     } else {
//       console.error('Error creating product:', error.message);
//       throw new Error('Failed to create product. Please try again later.'); // Handle generic error
//     }
//   }
// };

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


export const findAllCategories = async () => {
  try {
    const response = await axiosClient.get('/categories');
    return response.data; // Assuming the response.data is an array of categories
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};


export const updateCategory = async (id, updateCategoryDto) => {
  try {
    const response = await axiosClient.patch(`/categories/${id}`, updateCategoryDto);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Failed to update category. Please try again later.');
  }
};


export const createCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category. Please try again later.');
  }
};



export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosClient.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category. Please try again later.');
  }
};


export const getSumOfAllOrders = async () => {
  try {
    const response = await axiosClient.get('/statistics/sum-of-all-orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching sum of all orders:', error);
    throw error;
  }
};



export const getProductsOrderedByMostSold = async () => {
  try {
    const response = await axiosClient.get('/statistics/products-ordered-by-most-sold');
    return response.data;
  } catch (error) {
    console.error('Error fetching products ordered by most sold:', error);
    throw error;
  }
};


export const getCategoriesOrderedByMostSold = async () => {
  try {
    const response = await axiosClient.get('/statistics/categories-ordered-by-most-sold');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories ordered by most sold:', error);
    throw error;
  }
};