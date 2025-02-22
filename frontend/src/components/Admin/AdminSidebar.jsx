import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom"
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";


const AdminSidebar = () => {
  const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");

    };
  return (
    <div className="p-6 w-64 bg-gray-900 text-white h-screen ">
        <div className="mb-6" >
            <Link to="/admin" className="text-2xl font-medium">
            Luxora
            </Link> 
        </div>
        
        <h2 className="text-xl font-medium mb-6 text-center"> Admin Dashboard</h2>

        <nav className="flex flex-col space-y-2">

            {/* User */}

            <NavLink to="/admin/users" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaUser/>
            <span>Users</span>
            </NavLink>


             {/* Products */}

             <NavLink to="/admin/products" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaBoxOpen/>
            <span>Products</span>
            </NavLink>



              {/* Orders */}

              <NavLink to="/admin/orders" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaClipboardList/>
            <span>Orders</span>
            </NavLink>




 {/* Shop */}

 <NavLink to="/" className={({isActive}) => isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
            <FaStore/>
            <span>Shop</span>
            </NavLink>

       

        </nav>
        <div className="mt-6">
            <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
                <FaSignOutAlt/>

                <span>Logout</span>
            </button>
        </div>
      
    </div>
  )
}

export default AdminSidebar



