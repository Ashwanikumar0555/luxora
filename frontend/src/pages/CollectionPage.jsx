
///////////////////// corrected code ////////////////
import React, { useRef, useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSiderbar"; 
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";


const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products || {
    products: [],
    loading: false,
    error: null,
  });

  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (collection) {
      dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">{collection || "All Collections"}</h2>
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;


////////////////////////////
// import React, { useRef } from 'react'
// import {useState} from "react";
// import {FaFilter} from "react-icons/fa"; 
// import FilterSiderbar from '../components/Products/FilterSiderbar';
// import {  useEffect  } from 'react';
// import FilterSider from "../components/Products/FilterSiderbar"
// import SortOptions from '../components/Products/SortOptions';
// import ProductGrid from "../components/Products/ProductGrid"
// import { useParams,useSearchParams, } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductsByFilters } from '../redux/slices/productSlice'; // Import the thunk
// import ProductGrid from '../components/Products/ProductGrid';


// const CollectionPage = () => {

//     const { collection } = useParams();
//     const [searchParams] = useSearchParams();
//     const dispatch = useDispatch();
//     const { products, loading, error } = useSelector((state) => state.products);
//     const queryParams = Object.fromEntries([...searchParams]);
    
    

//     const sidebarRef = useRef(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     useEffect(() => {
//         dispatch(fetchProductByFilters({ collection, ...queryParams }));
//     }, [dispatch, collection, searchParams]);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const handleClickOutside = (e) => {
       
//         // close sidebar if clicked outside 
//         if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//             setIsSidebarOpen(false);
//         }
//     };
//     useEffect(() => {
//         // Add Event Listner For Clicks
//         document.addEventListener("mousedown", handleClickOutside);
//         // clean event listener 
//         return () => {
//             document.removeEventListener("mousedown",handleClickOutside);
//         }; 
//     }, []);


   


//   return (
//     <div className="flex flex-col lg:flex-row">

//         {/* Mobile Filter button */}

//         <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
//             <FaFilter className="mr-2"/> Filters

//         </button>

//         {/* Filter SideBar */}
//         <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed 
//         inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
//             <FilterSiderbar/>
//         </div>
//         <div className="flex-grow p-4">
//             <h2 className="text-2xl uppercase mb-4"> All Collections</h2>

//             {/* Sort Options */}

//             <SortOptions/>

//             {/* Product Grid */}
// <ProductGrid products={products} loading={loading} error={error} />

//         </div>
//     </div>
//   )
// }

// export default CollectionPage

