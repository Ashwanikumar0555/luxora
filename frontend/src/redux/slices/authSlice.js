// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Retrieve user info an token from local storage if available
// const userFromStorage = localStorage.getItem("userInfo")
// ? JSON.parse(localStorage.getItem("userInfo"))
// : null;

// // Check for an existing guest ID in the localStorage or generate a new One 
// const initialGuestId = 
// localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
// localStorage.setItem("guestId", initialGuestId);

// // Initial state
// const initialState = {
//     user: userFromStorage,
//     guestId: initialGuestId,
//     loading: false,
//     error: null,

// };

// // Async Thunk for User Login
// export const loginUser = createAsyncThunk(
//     "auth/loginUser",
//     async (userDate, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
//                 userData
//             );
//             localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//             localStorage.setItem("userToken", response.data.token); 
            
//             return response.data.user; // Return the user object from the response

//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


// // Async Thunk for User Registration
// export const registerUser = createAsyncThunk(
//     "auth/registerUser",
//     async (userDate, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
//                 userData
//             );
//             localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//             localStorage.setItem("userToken", response.data.token); 
            
//             return response.data.user; // Return the user object from the response

//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


// // Slice 
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
//             localStorage.removeItem("userInfo");
//             localStorage.removeItem("userToken");
//             localStorage.setItem("guestId", state.guestId); // Set new guest ID in localStorage 

//         },
//         generateNewGuestId: (state) => {
//             state.guestId = `guest_${new Date().getTime()}`;
//             localStorage.setItem("guestId", state.guestId);
//     },
// },

//  extraReducers: (builder) => {
//     builder
//     .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     })
//     .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//     })


//     .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//     })
//     .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     })
//     .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//     });
//  },
// });

// export const { logout, generateNewGuestId } = authSlice.actions;
// export default authSlice.reducer;



// /////////////////

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info from local storage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for an existing guest ID in localStorage or generate a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      const { user, token } = response.data;
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("userToken", token);

      return user;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Login failed due to a server error"
      );
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      const { user, token } = response.data;
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("userToken", token);

      return user;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed due to a server error"
      );
    }
  }
);

// Async Thunk for Merging Cart
export const mergeCart = createAsyncThunk(
  "auth/mergeCart",
  async ({ guestId, user }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart; // Access cart state
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, userId: user._id, cartItems: cart.products },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Merge cart error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to merge cart"
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${Date.now()}`;
      state.error = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => { // Fixed typo: PozzaPizza -> builder
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // MergeCart cases
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // Note: Cart state should be updated in a cart slice if needed
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;