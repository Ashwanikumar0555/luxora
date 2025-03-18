// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all users (admin only )
// export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
//     const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//         {
//             headers: { Authorization:  `Bearer ${localStorage.getItem("userToken")}` },
//         }
//     );
//      response.data;
// });

// // Add the create user Action 
// export const addUser = createAsyncThunk(
//     "admin/addUser",
//     async (useRouteLoaderData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//                 userData,
//                 {
//                     header: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                         },

//                     }
                
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Update user Info 
// export const updateUser = createAsyncThunk(
//     "admin/updateUser",
//     async ({ id, name, email, role }) => {
//         const response = await axios.put(
//             `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//             { name, email, role },
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,

//             }
//         }
//         );
//         response.data;
//     }
// );

// // Delete a user 
// export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
//  await axios.delete(
//     `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//     {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,

//         },
//     }
//  );
// });

// const adminSlice = createSlice({
//     name: "admin",
//     initialState: {
//         users: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchUsers.pending), (state) => {
//            state.loading = true;
//         })

//         .addCase(fetchUsers.fulfilled), (state, action) => {
//             state.loading = false;
//             state.users = action.payload;
//          })
         
//          .addCase(fetchUsers.rejected), (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//          })
//          .addCase(updateUser.fulfilled, (state, action) => {
//             const updateUser = action.payload;
//             const userIndex = state.users.findIndex(
//             (user) => user._id === updateUser._id
//             );
//             if (userIndex !== -1) {
//                 state.user[userIndex] = updateUser;
//             }
//         })
//         .addCase(deleteUser.fulfilled, (state, action) => {
//             state.users = state.users.filter((user) => user._id !== action.payload);
//         })
//         .addCase(addUser.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(addUser.fulfilled, (state, action) => {
//             state.loading = false;
//             state.users.push(action.payload.user) // add a new user to the state 
//         })
//         .addCase(addUser.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload.message;
//         })
        
//     },
// });

// export default adminSlice.reducer;


////////////////////corrected 
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all users (admin only)
// export const fetchUsers = createAsyncThunk(
//   "admin/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("fetchUsers response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("fetchUsers error:", error.response?.data || error.message);
//       return rejectWithValue(
//         error.response?.data || { message: "Not authorized as an admin or token invalid" }
//       );
//     }
//   }
// );

// // Add a new user
// export const addUser = createAsyncThunk(
//   "admin/addUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
//         userData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("addUser response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("addUser error:", error.response?.data || error.message);
//       return rejectWithValue(
//         error.response?.data || { message: "Not authorized as an admin or token invalid" }
//       );
//     }
//   }
// );

// // Update user info
// export const updateUser = createAsyncThunk(
//   "admin/updateUser",
//   async ({ id, name, email, role }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
//         { name, email, role },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("updateUser response:", response.data);
//       return response.data.user;
//     } catch (error) {
//       console.error("updateUser error:", error.response?.data || error.message);
//       return rejectWithValue(
//         error.response?.data || { message: "Not authorized as an admin or token invalid" }
//       );
//     }
//   }
// );

// // Delete a user
// export const deleteUser = createAsyncThunk(
//   "admin/deleteUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return id;
//     } catch (error) {
//       console.error("deleteUser error:", error.response?.data || error.message);
//       return rejectWithValue(
//         error.response?.data || { message: "Not authorized as an admin or token invalid" }
//       );
//     }
//   }
// );

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     users: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Users
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload || [];
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to fetch users";
//       })

//       // Add User
//       .addCase(addUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log("addUser fulfilled payload:", action.payload);
//         if (action.payload && action.payload._id) {
//           state.users.push(action.payload);
//         }
//       })
//       .addCase(addUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to add user";
//       })

//       // Update User
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUser = action.payload;
//         console.log("updateUser fulfilled payload:", updatedUser);
//         const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
//         if (userIndex !== -1) {
//           state.users[userIndex] = updatedUser;
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to update user";
//       })

//       // Delete User
//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = state.users.filter((user) => user._id !== action.payload);
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Failed to delete user";
//       });
//   },
// });

// export default adminSlice.reducer;


// /////////////

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("fetchUsers response:", response.data);
      return response.data; // Expecting an array of users
    } catch (error) {
      console.error("fetchUsers error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Not authorized as an admin or token invalid" }
      );
    }
  }
);

// Add a new user
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("addUser response:", response.data);
      return response.data; // Expecting the new user object
    } catch (error) {
      console.error("addUser error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Not authorized as an admin or token invalid" }
      );
    }
  }
);

// Update user role (e.g., admin to customer)
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, role }, { rejectWithValue }) => { // Simplified to only id and role
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { role }, // Send only the role field
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("updateUser response:", response.data);
      // Adjust based on API response structure
      return response.data.user ? response.data.user : response.data; // Handle nested user object
    } catch (error) {
      console.error("updateUser error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Not authorized as an admin or token invalid" }
      );
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      console.error("deleteUser error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data || { message: "Not authorized as an admin or token invalid" }
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("addUser fulfilled payload:", action.payload);
        if (action.payload && action.payload._id) {
          state.users.push(action.payload);
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add user";
      })

      // Update User (Role Change)
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        console.log("updateUser fulfilled payload:", updatedUser);
        const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser; // Update the user in the list
        } else {
          console.warn("User not found in state for update:", updatedUser._id);
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update user";
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete user";
      });
  },
});

export default adminSlice.reducer;

