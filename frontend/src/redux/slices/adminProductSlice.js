

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Helper function to get the token and handle null case
const getAuthHeader = () => {
  const token = localStorage.getItem("userToken");
  return token ? `Bearer ${token}` : null;
};

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("No authentication token found");
      
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data; // Ensure this matches your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("No authentication token found");

      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("No authentication token found");

      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const authHeader = getAuthHeader();
      if (!authHeader) throw new Error("No authentication token found");

      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      return id; // Return the ID for state filtering
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts", // Changed to plural to match state selector
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : action.payload.products || [];
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