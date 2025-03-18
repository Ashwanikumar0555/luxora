// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Helper function to load cart from localStorage
// const loadCartFromLocalStorage = () => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : { products: [] };
//     };

//     // Helper function to save cart to localStorage
//     const saveCartToLocalStorage = (cart) => {
//         localStorage.setItem("cart",JSON.stringify(cart));
//     };


//     // Fetch Cart for a useror guest 
//     export const fetchCart = createAsyncThunk(
//         "cart/fetchCart",
//          async ({ userId, guestId }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.get(
//                     `${import.meta.env.VITE-BACKEND_URL}/api/cart`,
//                     {
//                         params: { userId, guestId },
//                     }
//                 );
//                 return response.data;
//             } catch (error) {
//                 console.error(error);
//                 return rejectWithValue(error.response.data);
//             }
//          }
//         );
    

//         // Add an item to the cart for a user or guest 
//         export const addToCart = createAsyncThunk("cart/addToCart",async ({productId, quantity, size, color,
//             guestId, userId}, { rejectWithValue }) => {
//           try {
//         const response = await axios.post(`import.meta.env.VITE_BACKEND_URL}/api/cart`,
//             {
//                 productId,
//                 quantity,
//                 size,
//                 color,
//                 guestId,
//                 userId,

//             }

//         );
//         return response.data;
//           } catch (error) {
//         return rejectWithValue(error.response.data);
//           }
//         }
//     );

//     // Update the quantity of an item in the cart 
//     export const updateQuantity = createAsyncThunk(
//         "cart/updateCartItemQuantity", async ({productId, quantity, guestId, userId, size, color},
//             { rejectWithValue }) => {
//                 try {
//             const response = await axios.put(
//                 `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//                 {
//                     productId,
//                     quantity,
//                     guestId,
//                     userId,
//                     size,
//                     color,
//                 }
//             );
//             return response.data;
//                 } catch (error) {
//                     return rejectWithValue(error.response.data);
//                 }
//             }
//         );

//         // Remove an item from the cart
//         export const removeFromCart = createAsyncThunk(
//             "cart/removeFromCart", 
//             async ({productId, guestId, userId, size, color}, { rejectWithValue }) => {
//                 try {
//                     const response = await axios
                    
//                     method:"DELETE",
//                     url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`, 
//                     data: { productId, guestId, userId, size, color },
//             });
//             return response.data;
//             } catch (error) {
//                 return rejectWithValue(error.response.data);
//             }
//         }
//     );

//     // Merge guest cart into user cart
//     export const mergeGuestCart = createAsyncThunk(
//         "cart/mergeGuestCart",
//         async ({ guestId, user }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.post(
//                     `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
//                     { guestId, user },
//                     {

//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("userToken")}`,

//                         },
//                     }
//                 );
//                 return response.data;
//             } catch (error) {
//                 return rejectWithValue(error.response.data);
//             }
//         );

//         const cartSlice = createSlice({
//             name: "cart",
//             initialState: {
//                 cart: localCartFromStorage(),
//                 loading: false,
//                 error: null,
//             },
//             reducers: {
//                 clearCart: (state) => {
//                     state.cart = { products: []};
//                     localStorage.removeIte("cart");
//             },
//         },

//         extraReducers: (builder) => {
//             builder
//             .addCase(fetchCart.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 })
//                 .addCase(fetchCart.fulfilled, (state, action) => {
//                     state.loading = false;
//                     state.cart = action.payload;
//                     saveCartToLocalStorage(action.payload);
//                     })
//                     .addCase(fetchCart.pending, (state, action) => {
//                         state.loading = false;
//                         state.error = action.error.message || "Failed to fetch cart";
//                         })

//                         .addCase(addToCart.pending, (state) => {
//                             state.loading = true;
//                             state.error = null;
//                             })
//                             .addCase(addToCart.fulfilled, (state, action) => {
//                                 state.loading = false;
//                                 state.cart = action.payload;
//                                 saveCartToLocalStorage(action.payload);
//                                 })
//                                 .addCase(addToCart.pending, (state, action) => {
//                                     state.loading = false;
//                                     state.error = action.payload?.message || "Failed to add to cart";
//                                     })

//                                     .addCase(updateCartItemQuantity.pending, (state) => {
//                                         state.loading = true;
//                                         state.error = null;
//                                         })
//                                         .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
//                                             state.loading = false;
//                                             state.cart = action.payload;
//                                             saveCartToLocalStorage(action.payload);
//                                             })
//                                             .addCase(updateCartItemQuantity.rejected, (state, action) => {
//                                                 state.loading = false;
//                                                 state.error = action.payload?.message || "Failed to update item quantity";
//                                                 })

//                                                 .addCase(removeFromCart.pending, (state) => {
//                                                     state.loading = true;
//                                                     state.error = null;
//                                                     })
//                                                     .addCase(removeFromCart.fulfilled, (state, action) => {
//                                                         state.loading = false;
//                                                         state.cart = action.payload;
//                                                         saveCartToLocalStorage(action.payload);
//                                                         })
//                                                         .addCase(removeFromCart.rejected, (state, action) => {
//                                                             state.loading = false;
//                                                             state.error = action.payload?.message || "Failed to remove item ";
//                                                             })


//                                                             .addCase(mergeCart.pending, (state) => {
//                                                                 state.loading = true;
//                                                                 state.error = null;
//                                                                 })
//                                                                 .addCase(mergeCart.fulfilled, (state, action) => {
//                                                                     state.loading = false;
//                                                                     state.cart = action.payload;
//                                                                     saveCartToLocalStorage(action.payload);
//                                                                     })
//                                                                     .addCase(mergeCart.rejected, (state, action) => {
//                                                                         state.loading = false;
//                                                                         state.error = action.payload?.message || "Failed to merge cart";

//                                                                         })
//             },
//     });


//     export const { clearCart } = cartSlice.actions;
//     export default cartSlice.reducer;



//////////////////////////
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch Cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { params: { userId, guestId } }
            );
            return response.data;
        } catch (error) {
            console.error("Fetch cart error:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to fetch cart" });
        }
    }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { productId, quantity, size, color, guestId, userId }
            );
            return response.data;
        } catch (error) {
            console.error("Add to cart error:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
        }
    }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { productId, quantity, guestId, userId, size, color }
            );
            return response.data;
        } catch (error) {
            console.error("Update quantity error:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to update quantity" });
        }
    }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { data: { productId, guestId, userId, size, color } }
            );
            return response.data;
        } catch (error) {
            console.error("Remove from cart error:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to remove item" });
        }
    }
);

// Merge guest cart into user cart
export const mergeGuestCart = createAsyncThunk(
    "cart/mergeGuestCart",
    async ({ guestId, user }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                { guestId, user },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Merge cart error:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to merge cart" });
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        // Common handlers for async thunks
        const handlePending = (state) => {
            state.loading = true;
            state.error = null;
        };
        const handleFulfilled = (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToLocalStorage(action.payload);
        };
        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "An error occurred";
        };

        // Apply handlers to each async thunk
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, handlePending)
            .addCase(fetchCart.fulfilled, handleFulfilled)
            .addCase(fetchCart.rejected, handleRejected)

            // Add to Cart
            .addCase(addToCart.pending, handlePending)
            .addCase(addToCart.fulfilled, handleFulfilled)
            .addCase(addToCart.rejected, handleRejected)

            // Update Quantity
            .addCase(updateCartItemQuantity.pending, handlePending)
            .addCase(updateCartItemQuantity.fulfilled, handleFulfilled)
            .addCase(updateCartItemQuantity.rejected, handleRejected)

            // Remove from Cart
            .addCase(removeFromCart.pending, handlePending)
            .addCase(removeFromCart.fulfilled, handleFulfilled)
            .addCase(removeFromCart.rejected, handleRejected)

            // Merge Guest Cart
            .addCase(mergeGuestCart.pending, handlePending)
            .addCase(mergeGuestCart.fulfilled, handleFulfilled)
            .addCase(mergeGuestCart.rejected, handleRejected);
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;