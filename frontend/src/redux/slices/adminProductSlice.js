import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Fallback for safety

// Create an Axios instance for reusability and better token management
const api = axios.create({
  baseURL: `${API_URL}/api/admin`,
});

// Helper function to get the token
const getAuthHeader = () => {
  const token = localStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : null;
};

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        return rejectWithValue("Please log in to access admin products");
      }
      const response = await api.get("/products", { headers });
      return response.data; // Expecting an array of products
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized access - please log in again");
      }
      return rejectWithValue(message);
    }
  }
);

// Async thunk to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        return rejectWithValue("Please log in to create a product");
      }
      const response = await api.post("/products", productData, {
        headers: { ...headers, "Content-Type": "application/json" },
      });
      return response.data; // Expecting the created product object
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized - please log in again");
      }
      return rejectWithValue(message);
    }
  }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        return rejectWithValue("Please log in to update a product");
      }
      const response = await api.put(`/products/${id}`, productData, {
        headers: { ...headers, "Content-Type": "application/json" },
      });
      return response.data; // Expecting the updated product object
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized - please log in again");
      }
      return rejectWithValue(message);
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        return rejectWithValue("Please log in to delete a product");
      }
      await api.delete(`/products/${id}`, { headers });
      return id; // Return the ID for state filtering
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized - please log in again");
      }
      return rejectWithValue(message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Add a reducer to clear the error manually if needed
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
// const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// // Async thunk to fetch admin products
// export const fetchAdminProducts = createAsyncThunk(
//     "adminProducts/fetchAdminProducts",
//     async () => {
//         const response = await axios.get(`${API_URL}/api/admin/products`, {
//             headers: {
//                 Authorization: USER_TOKEN,
//             },
//         });
//         return response.data;
//     }
// );

// // Async function to create a new product 
// export const createProduct = createAsyncThunk(  // Fixed: Added parentheses
//     "adminProducts/createProduct",             // Fixed: Properly formatted
//     async (productData) => {
//         const response = await axios.post(
//             `${API_URL}/api/admin/products`, 
//             productData,
//             {
//                 headers: {
//                     Authorization: USER_TOKEN,
//                 },
//             }
//         );
//         return response.data;
//     }
// );

// // Async thunk to update an existing product 
// export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({id, productData}) => {
//     const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productData,
//          {
//             headers: {
//                 Authorization: USER_TOKEN,
//             }
//         }
//     );
//     return response.data;
// }
// );


// // Async thunk to delete a product
// export const deleteProduct = createAsyncThunk(
//     "adminProducts/deleteProduct",
//      async (id) => {
//         await axios.delete(`${API_URL}/api/admin/products/${id}`,{

//         });
//         return id;
//     }
// );

// const adminProductSlice = createSlice({
//     name: "adminProducts",
//     initialState: {
//         products: [],
//         loading: false,
//         error: null,

//     },
//     reducers: {},
//     extraReducers: (builder) => {

//         builder
//         .addCase(fetchAdminProducts.pending, (state) => {
//             state.loading = true;
//         })
//        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//        })
//        .addCase(fetchAdminProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//     })
// //  Create Product 
// .addCase(createProduct.fulfilled, (state, action) =>{
//     state.products.push(action.payload);
// })

// // Update Products 
// .addCase(updateProduct.fulfilled, (state, action) => {
//     const index = state.products.findIndex(
//         (product) => product._id === action.payload._id
//     );
//     if (index !== -1) {
//         state.products[index] = action.payload;
 
//     }
// })
// // Delete Product
// .addCase(deleteProduct.fulfilled, (state, action) => {
//     state.products = state.products.filter(
//         (product) => product._id !== action.payload
//     )
// })
//     },
// });

// export default adminProductSlice.reducer;


///////////////////