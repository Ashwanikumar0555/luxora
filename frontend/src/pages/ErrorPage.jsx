import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'; 
import Navbar from '../components/Common/Navbar'; 
import Topbar from '../components/Layout/Topbar'; 

const ErrorPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestedLinks] = useState([
        { title: 'Shop All', path: '/collections' },
        { title: 'Men', path: '/collections/men' },
        { title: 'Women', path: '/collections/women' },
    ]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            alert('Message sent successfully!');
            setContactForm({ name: '', email: '', message: '' });
        } catch (error) {
            alert('Failed to send message. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        document.querySelector('input[type="search"]')?.focus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <Topbar  /> {/* Imported Topbar */}
            <Navbar /> {/* Imported Navbar */}

            <motion.div 
                className="max-w-6xl mx-auto pt-20 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Error Message Section */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-9xl md:text-[12rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rabbit-red">
                        404
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-800 tracking-tight">
                        Oops! Lost in Style
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-lg mx-auto leading-relaxed">
                        This page seems to have gone out of fashion. Let’s get you back to the latest trends!
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6 mt-10"
                >
                    <Link 
                        to="/" 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        Return Home
                    </Link>
                    <Link 
                        to="/contact" 
                        className="bg-white hover:bg-gray-100 text-rabbit-red font-semibold py-3 px-10 rounded-full shadow-lg border border-rabbit-red hover:-translate-y-1 transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </motion.div>

                {/* Search Section */}
                <motion.div variants={itemVariants} className="mt-14">
                    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                        <input
                            type="search"
                            placeholder="Search our collections..."
                            className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors"
                        >
                            <FaSearch className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>

                {/* Suggested Links */}
                <motion.div variants={itemVariants} className="mt-14">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Explore These Instead:</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {suggestedLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="px-6 py-3 bg-white border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-16 bg-white p-8 rounded-3xl shadow-xl max-w-lg mx-auto border-t-4 border-rabbit-red"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Still Lost?</h3>
                    <form onSubmit={handleContactFormSubmit} className="space-y-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rabbit-red focus:border-transparent outline-none transition-all bg-white text-gray-800"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rabbit-red focus:border-transparent outline-none transition-all bg-white text-gray-800"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="What went wrong?"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rabbit-red focus:border-transparent outline-none transition-all bg-white text-gray-800 h-32 resize-none"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;