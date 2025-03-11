
import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  
 const [newArrivals, setNewArrivals] = useState([]);

 useEffect(() => {
  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
      );
      setNewArrivals(response.data);
    } catch (error) {
      console.error(error);
    }
 };

 fetchNewArrivals();
}, []);

  // Filter visible products by category
  const filteredProducts = selectedCategory === "all" 
    ? newArrivals
    : newArrivals.filter(product => product.category === selectedCategory);

  // Categories for filter
  const categories = [
    { id: "all", name: "All Products" },
    { id: "outerwear", name: "Outerwear" },
    { id: "tops", name: "Tops" },
    { id: "bottoms", name: "Bottoms" },
    { id: "footwear", name: "Footwear" }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -350 : 350;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const addToCart = (productId) => {
    // This would connect to your cart functionality
    console.log(`Added product ${productId} to cart`);
    // Show toast notification
    alert(`Added to cart successfully!`);
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  const handleViewChange = (count) => {
    setVisibleItems(count);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price * (100 - discount) / 100).toFixed(2);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-8 bg-gray-50">
      <div className="container mx-auto mb-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Explore New Arrivals</h2>
            <p className="text-lg text-gray-600">
              Discover the latest styles added to our collection
            </p>
          </div>
          
          {/* View Control & Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex border rounded overflow-hidden">
              <button 
                onClick={() => handleViewChange(2)} 
                className={`px-3 py-2 ${visibleItems === 2 ? 'bg-gray-800 text-white' : 'bg-white'}`}
              >
                2
              </button>
              <button 
                onClick={() => handleViewChange(3)} 
                className={`px-3 py-2 ${visibleItems === 3 ? 'bg-gray-800 text-white' : 'bg-white'}`}
              >
                3
              </button>
              <button 
                onClick={() => handleViewChange(4)} 
                className={`px-3 py-2 ${visibleItems === 4 ? 'bg-gray-800 text-white' : 'bg-white'}`}
              >
                4
              </button>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full shadow ${
                canScrollLeft 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full shadow ${
                canScrollRight 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll hide-scrollbar flex gap-6 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {filteredProducts.map((product) => (
          <div 
            key={product._id} 
            className={`min-w-[calc(100%/${visibleItems})] relative group`}
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
              {/* Image container with hover functionality */}
              <div className="relative overflow-hidden h-[400px]">
                {/* Sale tag */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    {product.discount}% OFF
                  </div>
                )}
                
                {/* Favorite button */}
                <button 
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md transition-all hover:bg-gray-100"
                >
                  <FiHeart 
                    className={`text-xl ${favorites[product._id] ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                  />
                </button>
                
                <img
                  src={hoveredProduct === product._id && product.images[1] ? product.images[1].url : product.images[0].url}
                  alt={hoveredProduct === product._id && product.images[1] ? product.images[1].altText : product.images[0].altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                />
                
                {/* Action buttons that appear on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2 bg-white bg-opacity-95 p-2 rounded-full shadow-lg">
                    <button 
                      onClick={() => addToCart(product._id)}
                      className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="Add to cart"
                    >
                      <FiShoppingCart />
                    </button>
                    <Link 
                      to={`/product/${product._id}`} 
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="View details"
                    >
                      <FiEye />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Product details */}
              <div className="p-4">
                <div className="flex items-center mb-1">
                  {/* Star rating */}
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.rating})</span>
                </div>
                
                <Link to={`/product/${product._id}`} className="block">
                  <h3 className="font-medium text-lg hover:text-gray-700 transition-colors">{product.name}</h3>
                  <div className="mt-1 flex items-center">
                    {product.discount > 0 ? (
                      <>
                        <span className="font-bold text-lg">${calculateDiscountedPrice(product.price, product.discount)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
                      </>
                    ) : (
                      <span className="font-bold text-lg">${product.price}</span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state if no products match filter */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found in this category.</p>
          <button 
            onClick={() => setSelectedCategory('all')} 
            className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            View All Products
          </button>
        </div>
      )}
      
      {/* View all button */}
      <div className="text-center mt-12">
        <Link 
          to="/collections/all" 
          className="inline-block px-8 py-3 border border-black bg-transparent text-black rounded hover:bg-black hover:text-white transition-colors font-medium"
        >
          View All Collections
        </Link>
      </div>
      
      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;