// import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch all orders (admin only )
// export const fetchAllOrders = createAsyncThunk(
//     "adminOrders/fetchAllOrders",
//     async (__,{ rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                         },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//          return rejectWithValue(error.response.data);
//         }
//     }
// );


// // Update order delivery status
// export const updateOrderStatus = createAsyncThunk(
//     "adminOrders/updateOrderStatus",
//     async ({ id, status  }, { rejectWithValue}) => {
//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                         },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//          return rejectWithValue(error.response.data);
//         }
//     }
// );



// // Delete an order 
// export const deleteOrder = createAsyncThunk(
//     "adminOrders/deleteOrder",
//     async ( id,    { rejectWithValue}) => {
//         try {
//             const response = await axios.delete(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                         },
//                 }
//             );
//             return id;
//         } catch (error) {
//          return rejectWithValue(error.response.data);
//         }
//     }
// );

// const adminOrderSlice = createSlice({
//     name: "adminOrders",
//     initialState: {
//         orders: [],
//         totalOrders: 0,
//         totalSales: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder 
//         // Fetch all orders
//         .addCase(fetchAllOrders.pending, (state) => {
//             state.loading = true;
//             state.error  = null;
//         })


         
//          .addCase(fetchAllOrders.fulfilled, (state, action) => {
//             state.loading = false;
//             state.orders = action.payload;
//             state.totalOrders = action.payload.length;
            
//             //  Calculate total sales
            
//             const totalSales = action.payload.reduce(( acc, order) => {
//                 return acc + order.totalPrice;
//             }, 0);
//             state.totalSales = totalSales;
//         })

         
//          .addCase(fetchAllOrders.rejected, (state, action) => {
//             state.loading = false;
//             state.error  = action.payload.message;
//         });

//         // Update Order Status
//         .addCase(updateOrderStatus.fulfilled, (state,action) => {
//             const updateOrder = action.payload;
//             const orderIndex = state.orders.findIndex(
//                 (order) => order._id === updateOrder._id
//             );
//             if (orderIndex !== -1) {
//                 state.orders[orderIndex] = updateOrder;
//             }
//         })
//         // Delete Order
//         .addCase(deleteOrder.fulfilled, (state, action) => {
//             state.orders = state.orders.filter(
//                 (order) => order._id !== action.payload
//             );
//         });

// },
// });

// export default orderSlice.reducer;

///////////////////////////////////// corrected code ////////////

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
// import axios from "axios";

// // Fetch all orders (admin only)
// export const fetchAllOrders = createAsyncThunk(
//     "adminOrders/fetchAllOrders",
//     async (_, { rejectWithValue }) => { 
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Update order delivery status
// export const updateOrderStatus = createAsyncThunk(
//     "adminOrders/updateOrderStatus",
//     async ({ id, status }, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Delete an order 
// export const deleteOrder = createAsyncThunk(
//     "adminOrders/deleteOrder",
//     async (id, { rejectWithValue }) => {
//         try {
//             await axios.delete( 
//                 `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//                     },
//                 }
//             );
//             return id;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// const adminOrderSlice = createSlice({
//     name: "adminOrders",
//     initialState: {
//         orders: [],
//         totalOrders: 0,
//         totalSales: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch all orders
//             .addCase(fetchAllOrders.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllOrders.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.orders = action.payload;
//                 state.totalOrders = action.payload.length;
//                 // Calculate total sales
//                 const totalSales = action.payload.reduce((acc, order) => {
//                     return acc + (order.totalPrice || 0); // Added fallback in case totalPrice is undefined
//                 }, 0);
//                 state.totalSales = totalSales;
//             })
//             .addCase(fetchAllOrders.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Failed to fetch orders"; // Added fallback
//             })
//             // Update Order Status - Added missing pending and rejected cases
//             .addCase(updateOrderStatus.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateOrderStatus.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const updatedOrder = action.payload;
//                 const orderIndex = state.orders.findIndex(
//                     (order) => order._id === updatedOrder._id
//                 );
//                 if (orderIndex !== -1) {
//                     state.orders[orderIndex] = updatedOrder;
//                 }
//             })
//             .addCase(updateOrderStatus.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Failed to update order";
//             })
//             // Delete Order - Added missing pending and rejected cases
//             .addCase(deleteOrder.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteOrder.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.orders = state.orders.filter(
//                     (order) => order._id !== action.payload
//                 );
//                 state.totalOrders = state.orders.length; // Update totalOrders
//                 // Recalculate totalSales
//                 state.totalSales = state.orders.reduce((acc, order) => {
//                     return acc + (order.totalPrice || 0);
//                 }, 0);
//             })
//             .addCase(deleteOrder.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Failed to delete order";
//             });
//     },
// });

// export default adminOrderSlice.reducer; 


////////////////////////////


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Added fallback

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => { 
        try {
            const token = localStorage.getItem("userToken"); // Standardized to "userToken"
            if (!token) {
                return rejectWithValue({ message: "No authentication token found" });
            }
            
            const response = await axios.get(
                `${API_URL}/api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

// Update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                return rejectWithValue({ message: "No authentication token found" });
            }
            
            const response = await axios.put(
                `${API_URL}/api/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", // Added content type
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

// Delete an order 
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                return rejectWithValue({ message: "No authentication token found" });
            }
            
            await axios.delete(
                `${API_URL}/api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {
        // Optional: Add a clearError action if needed
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload || {};
                state.orders = payload.orders || payload || []; // Handle different response structures
                state.totalOrders = payload.totalOrders || state.orders.length || 0;
                state.totalSales = payload.totalSales || state.orders.reduce((acc, order) => {
                    return acc + (order.totalPrice || 0);
                }, 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = { ...state.orders[orderIndex], ...updatedOrder };
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update order";
            })
            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.orders = state.orders.filter(
                    (order) => order._id !== deletedId
                );
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce((acc, order) => {
                    return acc + (order.totalPrice || 0);
                }, 0);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete order";
            });
    },
});

export const { clearError } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;