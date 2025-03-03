// import React from "react";
// import { Link } from "react-router-dom";
// import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi2";
// import { HiBars3BottomRight } from "react-icons/hi2";
// import SearchBar from "./SearchBar";
// import CartDrawer from "../Layout/CartDrawer";
// import { useState } from "react";
// import { IoMdClose } from "react-icons/io";

// import LuxoraButton from "../LuxoraButton";



// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [navDrawerOpen, setNavDrawerOpen] = useState(false);

//   const toggleNavDrawer = () => {
//     setNavDrawerOpen(!navDrawerOpen);
//   };

//   const toggleCartDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <>
//       <nav className="container mx-auto flex item-center justify-between py-4 px-6">
//         {/*  Left - Logo */}

//         <div>
//           <Link to="/" className="text-2xl font-medium">

//             {/* LUXORA BUTTON BATMAN  */}
//             <LuxoraButton/>
//             {/* LUXORA BUTTON BATMAN  */}
            
//           </Link>
//         </div>

//         {/* Center - Navigation  Links */}
//         <div className="hidden md:flex space-x-6">
//           <Link
//             to="/collections/all"
//             className="text-gray-700 hover:text-black text-sm font-medium uppercase"
//           >
//             Men
//           </Link>

//           <Link
//             to="#"
//             className="text-gray-700 hover:text-black text-sm font-medium uppercase"
//           >
//             Women
//           </Link>

//           <Link
//             to="#"
//             className="text-gray-700 hover:text-black text-sm font-medium uppercase"
//           >
//             Top Wear
//           </Link>

//           <Link
//             to="#"
//             className="text-gray-700 hover:text-black text-sm font-medium uppercase"
//           >
//             Bottom Wear
//           </Link>
//         </div>

//         {/* Right - Icons */}

//         <div className=" flex items-center space-x-4 ">
//           <Link to="admin" className="block bg-black px-2 rounded text-sm text-white hover:bg-rabbit-red transition">
//           Admin
//           </Link>
//           <Link to="/profile" className="hover:text-color-black">
//             <HiOutlineUser className="h-6 w-6 text-gray-700" />
//           </Link>
//           <button
//             onClick={toggleCartDrawer}
//             className="relative hover:text-black"
//           >
//             <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
//             <span className="absolute -top-1  bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
//               4
//             </span>
//           </button>

//           {/* Search */}
//           <div className="overflow-hidden"></div>
//           <SearchBar />


       

           



//           <button onClick={toggleNavDrawer} className="md:hidden">
//             <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
//           </button>
//         </div>
//       </nav>
//       <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

//       {/* Mobile Navigation */}

//       <div
//         className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//           navDrawerOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-end p-4">
//           <button onClick={toggleNavDrawer}>
//             <IoMdClose className="h-6 w-6 text-gray-600 " />
//           </button>
//         </div>
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-4">Menu</h2>
//           <nav className="space-y-4">
//             <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
//             Men 
//             </Link>
           

//             <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
//             Women
//             </Link>

//             <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
//             Top Wear
//             </Link>

//             <Link to="#" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
//             Bottom Wear 
//             </Link>


//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;


// deep seek 


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import LuxoraButton from "../LuxoraButton";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const navigationLinks = [
    {
      name: "Men",
      path: "/collections/all", // Navigates to All Collections
      submenu: [
        { name: "Shirts", path: "/men/shirts" },
        { name: "T-Shirts", path: "/men/t-shirts" },
        { name: "Jeans", path: "/men/jeans" },
        { name: "Jackets", path: "/men/jackets" },
      ],
    },
    {
      name: "Women",
      path: "/collections/all", // Navigates to All Collections
      submenu: [
        { name: "Dresses", path: "/women/dresses" },
        { name: "Tops", path: "/women/tops" },
        { name: "Jeans", path: "/women/jeans" },
        { name: "Skirts", path: "/women/skirts" },
      ],
    },
    {
      name: "Top Wear",
      path: "/collections/all", // Navigates to All Collections
      submenu: [
        { name: "Shirts", path: "/top-wear/shirts" },
        { name: "T-Shirts", path: "/top-wear/t-shirts" },
        { name: "Sweaters", path: "/top-wear/sweaters" },
      ],
    },
    {
      name: "Bottom Wear",
      path: "/collections/all", // Navigates to All Collections
      submenu: [
        { name: "Jeans", path: "/bottom-wear/jeans" },
        { name: "Trousers", path: "/bottom-wear/trousers" },
        { name: "Shorts", path: "/bottom-wear/shorts" },
      ],
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Left - Logo */}
          <div>
            <Link to="/" className="text-2xl font-medium">
              <LuxoraButton />
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => handleDropdown(link.name)}
                onMouseLeave={() => handleDropdown(null)}
              >
                <Link
                  to={link.path}
                  className="text-gray-700 hover:text-black text-sm font-medium uppercase transition duration-300"
                >
                  {link.name}
                </Link>
                {openDropdown === link.name && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition duration-300"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right - Icons and Actions */}
          <div className="flex items-center space-x-6">
            <Link
              to="admin"
              className="hidden md:block bg-black px-4 py-2 rounded text-sm text-white hover:bg-rabbit-red transition duration-300"
            >
              Admin
            </Link>
            <Link to="/profile" className="hover:text-black transition duration-300">
              <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-black" />
            </Link>
            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black transition duration-300"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 hover:text-black" />
              <span className="absolute -top-1 -right-1 bg-rabbit-red text-white text-xs rounded-full px-1.5 py-0.5">
                4
              </span>
            </button>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700 hover:text-black" />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 hover:text-black" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Menu</h2>
          <nav className="space-y-4">
            {navigationLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.path}
                  onClick={toggleNavDrawer}
                  className="block text-gray-600 hover:text-black transition duration-300"
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 mt-2 space-y-2">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={toggleNavDrawer}
                        className="block text-gray-500 hover:text-black transition duration-300"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;