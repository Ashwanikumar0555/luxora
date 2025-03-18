
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice'; 
// import productReducer from "./slices/productSlice";
// import cartReducer from "./slices/cartSlice";
// import checkoutReducer from "./slices/checkoutSlice";
// import orderReducer from "./slices/orderSlice";
// import adminSlice from './slices/adminSlice';



// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     products: productReducer,
//     cart: cartReducer, 
//     checkout: checkoutReducer,
//     orders: orderReducer,
//     admin: adminSlice
    
//   },
// });

// export default store;

/////////////////////////////////////


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import orderReducer from './slices/orderSlice';
import adminReducer from './slices/adminSlice';
import adminProductReducer from './slices/adminProductSlice'; // Fixed typo: adminProductReducer (singular)
import adminOrdersReducer from './slices/adminOrderSlice'; // Fixed typo: adminOrdersReducer (plural)

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        admin: adminReducer,
        adminProducts: adminProductReducer, // Consistent naming
        adminOrders: adminOrdersReducer,    // Consistent naming
    },
});

export default store;