// import React from 'react'
// import {Link} from "react-router-dom"



// const AdminHomePage = () => {

    
// const orders = [
//     {
//        _id: 123123,
//        user:{
//         name:"John Doe",
//        },
//        totalPrice: 110,
//        status: "Processing",                   
//     },

    
     

     
     
// ];


//   return (
//     <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6"> Admin Dashboard</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="p-4 shadow-md rounded-lg">
//                 <h2 className="text-xl font-semibold">Revenue</h2>
//                 <p className="text-2xl">$10000</p>

//             </div>

//             <div className="p-4 shadow-md rounded-lg">
//                 <h2 className="text-xl font-semibold">Total Orders</h2>
//                 <p className="text-2xl">200</p>
//                 <Link to="/admin/orders" className="text-blue-500 hover:underline">
//                 Manage Orders
//                 </Link>

//             </div>

//             <div className="p-4 shadow-md rounded-lg">
//                 <h2 className="text-xl font-semibold">Total Products</h2>
//                 <p className="text-2xl">100</p>
//                 <Link to="/admin/products" className="text-blue-500 hover:underline">
//                 Manage Products
//                 </Link>

//             </div>
//         </div>

//         <div className="mt-6">
//             <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-left text-gray-500">
//                     <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//                         <tr>
//                             <th className="py-3 px-4">Order ID</th>
//                             <th className="py-3 px-4">User</th>
//                             <th className="py-3 px-4">Total Price</th>
//                             <th className="py-3 px-4">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.length > 0 ? (
//                             orders.map((order) => ( 
//                                 <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
//                                     <td className="p-4">{order._id}</td>
//                                     <td className="p-4">{order.user.name}</td>
//                                     <td className="p-4">{order.totalPrice}</td>
//                                     <td className="p-4">{order.status}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={4} className="p-4 text-center text-gray-500">
//                                     No recent orders found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
      
//     </div>
//   )
// }

// export default AdminHomePage





///////////////////
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const AdminHomePage = () => {
    const [orders, setOrders] = useState([
        {
            _id: 123123,
            user: {
                name: "John Doe",
            },
            totalPrice: 110,
            status: "Processing",
        },
        // Add more orders here...
    ]);

    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const navigate = useNavigate();

    // Function to filter orders by status
    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'All') return true;
        return order.status === filterStatus;
    });

    // Function to search orders by ID or user name
    const searchedOrders = filteredOrders.filter(order => {
        const query = searchQuery.toLowerCase();
        return String(order._id).includes(query) || order.user.name.toLowerCase().includes(query);
    });

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = searchedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Function to update order status
    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order._id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 shadow-md rounded-lg bg-blue-100">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl">$10,000</p>
                </div>

                <div className="p-4 shadow-md rounded-lg bg-green-100">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl">{orders.length}</p>
                    <Link to="/admin/orders" className="text-blue-500 hover:underline">
                        Manage Orders
                    </Link>
                </div>

                <div className="p-4 shadow-md rounded-lg bg-yellow-100">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl">100</p>
                    <Link to="/admin/products" className="text-blue-500 hover:underline">
                        Manage Products
                    </Link>
                </div>
            </div>

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
                                        <td className="p-4">{order.user.name}</td>
                                        <td className="p-4">{order.totalPrice}</td>
                                        <td className="p-4">{order.status}</td>
                                        <td className="p-4">
                                            <Link to={`/admin/orders/${order._id}`} className="text-blue-500 hover:underline mr-2">
                                                View Details
                                            </Link>
                                            <select
                                                className="px-4 py-2 border border-gray-300 rounded-md"
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
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
                    {Array(Math.ceil(searchedOrders.length / ordersPerPage)).fill(null).map((_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;
