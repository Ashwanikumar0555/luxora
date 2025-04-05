
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders, updateOrderStatus } from "../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const {
        products,
        loading: productsLoading,
        error: productsError,
    } = useSelector((state) => state.adminProducts);
    const { 
        orders,
        totalOrders,
        totalSales,
        loading: orderLoading,
        error: ordersError,
    } = useSelector((state) => state.adminOrders);

    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
        return matchesStatus && matchesSearch;
    });

    const currentOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const handleUpdateOrderStatus = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ id: orderId, status: newStatus }))
            .unwrap()
            .then(() => console.log(`Order ${orderId} status updated to ${newStatus}`))
            .catch((error) => console.error(`Failed to update order status: ${error}`));
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {productsLoading || orderLoading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className="text-red-500">Error fetching products: {productsError}</p>
            ) : ordersError ? (
                <p className="text-red-500">
                    Error fetching orders: {ordersError}
                    {ordersError.includes('token') && (
                        <span> Please <Link to="/login" className="underline">log in</Link> to continue.</span>
                    )}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 shadow-md rounded-lg bg-blue-100">
                        <h2 className="text-xl font-semibold">Revenue</h2>
                        <p className="text-2xl">${totalSales.toFixed(2)}</p>
                    </div>
                    <div className="p-4 shadow-md rounded-lg bg-green-100">
                        <h2 className="text-xl font-semibold">Total Orders</h2>
                        <p className="text-2xl">{totalOrders}</p>
                        <Link to="/admin/orders" className="text-blue-500 hover:underline">
                            Manage Orders
                        </Link>
                    </div>
                    <div className="p-4 shadow-md rounded-lg bg-yellow-100">
                        <h2 className="text-xl font-semibold">Total Products</h2>
                        <p className="text-2xl">{products.length}</p>
                        <Link to="/admin/products" className="text-blue-500 hover:underline">
                            Manage Products
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="flex justify-between mb-4">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>

                    <input
                        type="search"
                        placeholder="Search by ID or User Name"
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Total Price</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                        <td className="p-4">{order._id}</td>
                                        <td className="p-4">
                                            {order.user?.name || 'Unknown User'}
                                        </td>
                                        <td className="p-4">
                                            ${order.totalPrice?.toFixed(2) || '0.00'}
                                        </td>
                                        <td className="p-4">{order.status || 'N/A'}</td>
                                        <td className="p-4">
                                            <Link 
                                                to={`/admin/orders/${order._id}`} 
                                                className="text-blue-500 hover:underline mr-2"
                                            >
                                                View Details
                                            </Link>
                                            <select
                                                className="px-4 py-2 border border-gray-300 rounded-md"
                                                value={order.status || 'Processing'}
                                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    {filteredOrders.length > 0 && (
                        Array(Math.ceil(filteredOrders.length / ordersPerPage)).fill(null).map((_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;


// ///////////////////
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from "react-router-dom";

// const AdminHomePage = () => {
//     const dispatch = useDispatch();
//     const {
//         products,
//         loading: productsLoading,
//         error: productsError,
//     } = useSelector((state) => state.adminProducts);
//     const { 
//         orders,
//         totalOrders,
//         totalSales,
//         loading: orderLoading,
//         error: ordersError,
//     } = useSelector((state) => state.adminOrders);

//     useEffect(() => {
//         dispatch(fetchAdminProducts());
//         dispatch(fetchAllOrders());
//     }, [dispatch]);
   

    

//     return (
//         <div className="max-w-7xl mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//             {productsLoading || ordersLoading ? (
//                 <p>Loading ...</p>
//             ) : productsError ? (
//                 <p className="text-red-500">Error fetching products: {productsError}</p>
//             ): ordersError ? (
//                 <p className="text-red-500">Error fetching orders: {ordersError}</p>
//             ): (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="p-4 shadow-md rounded-lg bg-blue-100">
//                     <h2 className="text-xl font-semibold">Revenue</h2>
//                     <p className="text-2xl">${totalSales.toFixed(2)}</p>
//                 </div>
//                 </div>
                      
//                     )}

//                 <div className="p-4 shadow-md rounded-lg bg-green-100">
//                     <h2 className="text-xl font-semibold">Total Orders</h2>
//                     <p className="text-2xl">{totalOrders}</p>
//                     <Link to="/admin/orders" className="text-blue-500 hover:underline">
//                         Manage Orders
//                     </Link>
//                 </div>
            
//                 <div className="p-4 shadow-md rounded-lg bg-yellow-100">
            
//                     <h2 className="text-xl font-semibold">Total Products</h2>
//                     <p className="text-2xl">{products.length}</p>
//                     <Link to="/admin/products" className="text-blue-500 hover:underline">
//                         Manage Products
//                     </Link>
//                 </div>
//             </div>

//             <div className="mt-6">
//                 <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
//                 <div className="flex justify-between mb-4">
//                     <select
//                         className="px-4 py-2 border border-gray-300 rounded-md"
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                     >
//                         <option value="All">All</option>
//                         <option value="Processing">Processing</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                     </select>

//                     <input
//                         type="search"
//                         placeholder="Search by ID or User Name"
//                         className="px-4 py-2 border border-gray-300 rounded-md"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-left text-gray-500">
//                         <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//                             <tr>
//                                 <th className="py-3 px-4">Order ID</th>
//                                 <th className="py-3 px-4">User</th>
//                                 <th className="py-3 px-4">Total Price</th>
//                                 <th className="py-3 px-4">Status</th>
//                                 <th className="py-3 px-4">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentOrders.length > 0 ? (
//                                 currentOrders.map((order) => (
//                                     <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
//                                         <td className="p-4">{order._id}</td>
//                                         <td className="p-4">{order.user.name}</td>
//                                         <td className="p-4">{order.totalPrice.toFixed(2)}</td>
//                                         <td className="p-4">{order.status}</td>
//                                         <td className="p-4">
//                                             <Link to={`/admin/orders/${order._id}`} className="text-blue-500 hover:underline mr-2">
//                                                 View Details
//                                             </Link>
//                                             <select
//                                                 className="px-4 py-2 border border-gray-300 rounded-md"
//                                                 value={order.status}
//                                                 onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                                             >
//                                                 <option value="Processing">Processing</option>
//                                                 <option value="Shipped">Shipped</option>
//                                                 <option value="Delivered">Delivered</option>
//                                             </select>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={5} className="p-4 text-center text-gray-500">
//                                         No recent orders found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="mt-4">
//                     {Array(Math.ceil(searchedOrders.length / ordersPerPage)).fill(null).map((_, index) => (
//                         <button
//                             key={index}
//                             className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
//                             onClick={() => setCurrentPage(index + 1)}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminHomePage;


// /////////////////



//////////////////////////////////////////////////////

