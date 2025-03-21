

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to Fetch Products by Collection and Optional Filters
export const fetchProductsByFilters = createAsyncThunk(
  'products/fetchByFilters',
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append('collection', collection);
    if (size) query.append('size', size);
    if (color) query.append('color', color);
    if (gender) query.append('gender', gender);
    if (minPrice) query.append('minPrice', minPrice);
    if (maxPrice) query.append('maxPrice', maxPrice);
    if (sortBy) query.append('sortBy', sortBy);
    if (search) query.append('search', search);
    if (category) query.append('category', category);
    if (material) query.append('material', material);
    if (brand) query.append('brand', brand);
    if (limit) query.append('limit', limit);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch products';
      throw new Error(errorMessage);
    }
  }
);

// Async Thunk to Fetch a Single Product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch product details';
      throw new Error(errorMessage);
    }
  }
);

// Async Thunk to Update Product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => { 
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken') || ''}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to update product';
      throw new Error(errorMessage);
    }
  }
);

// Async Thunk to Fetch Similar Products
export const fetchSimilarProducts = createAsyncThunk(
  'products/fetchSimilarProducts',
  async (id) => { // Fixed parameter to match usage
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}` 
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch similar products';
      throw new Error(errorMessage);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      size: '',
      color: '',
      gender: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sortBy: '',
      search: '',
      material: '',
      collection: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        size: '',
        color: '',
        gender: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        sortBy: '',
        search: '',
        material: '',
        collection: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products by Filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      // Fetch Single Product by ID
      .addCase(fetchProductById.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.selectedProduct = updatedProduct; // Optionally update selectedProduct
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload; // Fixed: Assign to 'similarProducts', not 'products'
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Fixed typo: 'state.error -' -> '='
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;


////////////////////




////////////////////import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunk to Fetch Products by Collection and Optional Filters
// export const fetchProductsByFilters = createAsyncThunk(
//   'products/fetchByFilters',
//   async ({
//     collection,
//     size,
//     color,
//     gender,
//     minPrice,
//     maxPrice,
//     sortBy,
//     search,
//     category,
//     material,
//     brand,
//     limit,
//   }) => {
//     const query = new URLSearchParams();
//     if (collection) query.append('collection', collection);
//     if (size) query.append('size', size);
//     if (color) query.append('color', color);
//     if (gender) query.append('gender', gender);
//     if (minPrice) query.append('minPrice', minPrice);
//     if (maxPrice) query.append('maxPrice', maxPrice);
//     if (sortBy) query.append('sortBy', sortBy);
//     if (search) query.append('search', search);
//     if (category) query.append('category', category);
//     if (material) query.append('material', material);
//     if (brand) query.append('brand', brand);
//     if (limit) query.append('limit', limit);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || 'Failed to fetch products';
//       throw new Error(errorMessage);
//     }
//   }
// );

// // Async Thunk to Fetch a Single Product by ID
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || 'Failed to fetch product details';
//       throw new Error(errorMessage);
//     }
//   }
// );

// // Async Thunk to Update Product
// export const updateProduct = createAsyncThunk(
//   'products/updateProduct',
//   async ({ id, productData }) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
//         productData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken') || ''}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || 'Failed to update product';
//       throw new Error(errorMessage);
//     }
//   }
// );

// // Async Thunk to Fetch Similar Products
// export const fetchSimilarProducts = createAsyncThunk(
//   'products/fetchSimilarProducts',
//   async (id) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || error.message || 'Failed to fetch similar products';
//       throw new Error(errorMessage);
//     }
//   }
// );

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     selectedProduct: null,
//     similarProducts: [],
//     loading: false,
//     error: null,
//     filters: {
//       category: '',
//       size: '',
//       color: '',
//       gender: '',
//       brand: '',
//       minPrice: '',
//       maxPrice: '',
//       sortBy: '',
//       search: '',
//       material: '',
//       collection: '',
//     },
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters: (state) => {
//       state.filters = {
//         category: '',
//         size: '',
//         color: '',
//         gender: '',
//         brand: '',
//         minPrice: '',
//         maxPrice: '',
//         sortBy: '',
//         search: '',
//         material: '',
//         collection: '',
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Products by Filters
//       .addCase(fetchProductsByFilters.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchProductsByFilters.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Fetch Single Product by ID
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Update Product
//       .addCase(updateProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedProduct = action.payload;
//         const index = state.products.findIndex(
//           (product) => product._id === updatedProduct._id
//         );
//         if (index !== -1) {
//           state.products[index] = updatedProduct;
//         }
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Fetch Similar Products
//       .addCase(fetchSimilarProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.similarProducts = action.payload;
//       })
//       .addCase(fetchSimilarProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setFilters, clearFilters } = productsSlice.actions;
// export default productsSlice.reducer;

///////////