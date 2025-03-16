

/////////////////////////  2nd part of the code  //////////////////////////
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Heart, Share, ChevronLeft, ChevronRight, Star, Check, Truck, RotateCw, CreditCard } from 'lucide-react';

import { fetchProductById, fetchSimilarProducts } from '../../redux/slices/productSlice'; // Corrected import
import { addToCart } from '../../redux/slices/cartSlice';
import ProductGrid from '../Products/ProductGrid';

const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { selectedProduct, loading, error, similarProducts } = useSelector(
        (state) => state.products || { selectedProduct: null, loading: false, error: null, similarProducts: [] }
    );
    const { user, guestId } = useSelector((state) => state.auth || { user: null, guestId: null });
    
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const productFetchId = productId || id;
    const imageRef = useRef(null);

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductById(productFetchId)); // Changed from fetchProductDetails
            dispatch(fetchSimilarProducts(productFetchId));
        }
    }, [dispatch, productFetchId]);
    
    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
            setCurrentImageIndex(0);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === 'plus' && quantity < (selectedProduct?.stock || 0)) {
            setQuantity((prev) => prev + 1);
        }
        if (action === 'minus' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor) {
            toast.error('Please select a size and color before adding to cart.', { duration: 1500 });
            return;
        }
        
        if (selectedProduct.stock <= 0) {
            toast.error('Product is out of stock.', { duration: 1500 });
            return;
        }

        setIsButtonDisabled(true);

        try {
            await dispatch(
                addToCart({
                    productId: productFetchId,
                    quantity,
                    size: selectedSize,
                    color: selectedColor,
                    guestId,
                    userId: user?._id,
                })
            ).unwrap();
            
            toast.success('Product added to cart!', { duration: 1000 });
        } catch (err) {
            toast.error(`Failed to add product to cart: ${err.message || 'Unknown error'}`, { duration: 1500 });
        } finally {
            setIsButtonDisabled(false);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
        toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1500 });
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Share link copied to clipboard!', { duration: 1500 });
        } catch (err) {
            toast.error('Failed to copy link', { duration: 1500 });
        }
    };

    const handleImageHover = (e) => {
        if (!imageRef.current) return;
        
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setZoomPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) });
    };

    const navigateImage = (direction) => {
        if (!selectedProduct?.images?.length) return;
        const newIndex = direction === 'next'
            ? (currentImageIndex + 1) % selectedProduct.images.length
            : (currentImageIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length;
        
        setCurrentImageIndex(newIndex);
        setMainImage(selectedProduct.images[newIndex].url);
    };

    const colorMap = {
        Red: '#E53E3E',
        Black: '#1A202C',
        Navy: '#2B6CB0',
        Brown: '#8B4513',
    };

    const calculatedDiscount = selectedProduct?.originalPrice && selectedProduct?.price
        ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
        : 0;

    if (loading) return <div className="p-6 text-center"><p>Loading...</p></div>;
    if (error) return <div className="p-6 text-center"><p>Error: {error}</p></div>;
    if (!selectedProduct) return <div className="p-6 text-center"><p>No product found</p></div>;

    return (
        <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto mb-4 text-sm">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li><a href="/" className="text-gray-600 hover:text-gray-900">Home</a></li>
                        <li><span className="mx-1">/</span><a href="/category/clothing" className="text-gray-600 hover:text-gray-900">Clothing</a></li>
                        <li><span className="mx-1">/</span><a href="/category/jackets" className="text-gray-600 hover:text-gray-900">Jackets</a></li>
                        <li><span className="mx-1">/</span><span className="text-gray-400">{selectedProduct.name}</span></li>
                    </ol>
                </nav>
            </div>

            <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <div className="relative mb-4">
                            <div
                                className="relative overflow-hidden rounded-lg bg-gray-100"
                                onMouseMove={handleImageHover}
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                ref={imageRef}
                            >
                                <img
                                    src={mainImage || '/placeholder-image.jpg'}
                                    alt={selectedProduct.images?.[currentImageIndex]?.altText || 'Product Image'}
                                    className="w-full h-[400px] object-contain rounded-lg transition-opacity"
                                    onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                                />
                                {isZoomed && mainImage && (
                                    <div
                                        className="absolute inset-0 pointer-events-none bg-no-repeat"
                                        style={{
                                            backgroundImage: `url(${mainImage})`,
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            backgroundSize: '200%',
                                        }}
                                    />
                                )}
                                {calculatedDiscount > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                        {calculatedDiscount}% OFF
                                    </div>
                                )}
                            </div>
                            {selectedProduct.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={() => navigateImage('prev')}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => navigateImage('next')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md hover:bg-white"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                        {selectedProduct.images?.length > 0 && (
                            <div className="grid grid-cols-4 gap-2">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={image.altText || `Thumbnail ${index + 1}`}
                                        className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 ${
                                            mainImage === image.url ? 'border-black' : 'border-transparent'
                                        } hover:opacity-90`}
                                        onClick={() => {
                                            setMainImage(image.url);
                                            setCurrentImageIndex(index);
                                        }}
                                        onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl md:text-3xl font-semibold">{selectedProduct.name}</h1>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleFavorite}
                                    className={`p-2 rounded-full ${
                                        isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                                    }`}
                                    aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <Heart className={isFavorite ? 'fill-current' : ''} size={20} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-full bg-gray-100 text-gray-500"
                                    aria-label="Share product"
                                >
                                    <Share size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < Math.floor(selectedProduct.rating || 0) ? 'fill-current' : ''}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {selectedProduct.rating || 0} ({selectedProduct.reviewCount || 0} reviews)
                            </span>
                        </div>

                        <div className="mb-4">
                            {selectedProduct.originalPrice && (
                                <p className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</p>
                            )}
                            <p className="text-2xl font-bold text-gray-900">${selectedProduct.price || 0}</p>
                            <div className="mt-1 text-sm">
                                {selectedProduct.stock > 0 ? (
                                    <span className="text-green-600 flex items-center">
                                        <Check size={14} className="mr-1" /> In Stock ({selectedProduct.stock} available)
                                    </span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-2">
                                Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
                            </p>
                            <div className="flex gap-3">
                                {(selectedProduct.colors || []).map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 ${
                                            selectedColor === color ? 'border-black' : 'border-transparent'
                                        }`}
                                        style={{ backgroundColor: colorMap[color] || color.toLowerCase() }}
                                        aria-label={`Select ${color} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-2">
                                Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {(selectedProduct.sizes || []).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1 rounded-md border ${
                                            selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'border-gray-300 hover:border-black'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 font-medium mb-2">Quantity:</p>
                            <div className="flex items-center w-32 h-10 border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange('minus')}
                                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="flex-1 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange('plus')}
                                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                    disabled={quantity >= (selectedProduct.stock || 0)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled || selectedProduct.stock === 0}
                            className={`w-full py-3 rounded-md text-white font-medium ${
                                isButtonDisabled || selectedProduct.stock === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-black hover:bg-gray-800'
                            }`}
                        >
                            {isButtonDisabled
                                ? 'Adding...'
                                : selectedProduct.stock === 0
                                ? 'Out of Stock'
                                : 'Add to Cart'}
                        </button>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center">
                                <Truck size={18} className="text-gray-500 mr-3" />
                                <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                            </div>
                            <div className="flex items-center">
                                <RotateCw size={18} className="text-gray-500 mr-3" />
                                <span className="text-sm text-gray-600">30-day return policy</span>
                            </div>
                            <div className="flex items-center">
                                <CreditCard size={18} className="text-gray-500 mr-3" />
                                <span className="text-sm text-gray-600">Secure payments</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 -mb-px">
                            {['description', 'specifications', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                        activeTab === tab
                                            ? 'border-black text-black'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="py-6">
                        {activeTab === 'description' && (
                            <p className="text-gray-700">{selectedProduct.description || 'No description available.'}</p>
                        )}
                        {activeTab === 'specifications' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div><strong>Brand:</strong> {selectedProduct.brand || 'N/A'}</div>
                                <div><strong>SKU:</strong> {selectedProduct.sku || 'N/A'}</div>
                                <div><strong>Material:</strong> {selectedProduct.material || 'N/A'}</div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div>
                                <p className="text-gray-700">
                                    {selectedProduct.reviewCount > 0
                                        ? 'Customer reviews coming soon.'
                                        : 'No reviews yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {similarProducts?.length > 0 && (
                <div className="max-w-6xl mx-auto mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
                    <ProductGrid products={similarProducts} loading={loading} error={error} />
                </div>
            )}
        </div>
    );
};

export default ProductDetails;