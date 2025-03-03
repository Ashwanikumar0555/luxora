import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Services', path: '/services' },
    ]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Your message has been sent successfully!');
            setContactForm({ name: '', email: '', message: '' });
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        document.querySelector('input[type="search"]')?.focus();
    }, []);

    // Topbar Component
    const Topbar = () => (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm px-6 py-4 z-50 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-900 hover:text-blue-600 transition-colors">
                MyApp
            </Link>
            <div className="flex gap-4">
                <Link 
                    to="/login" 
                    className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition-colors"
                >
                    Log In
                </Link>
                <Link 
                    to="/signup" 
                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );

    // Navbar Component
    const Navbar = () => (
        <nav className="w-full bg-white mt-16 border-b border-gray-200 shadow-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex gap-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium relative group transition-colors">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium relative group transition-colors">
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link to="/services" className="text-gray-600 hover:text-blue-600 font-medium relative group transition-colors">
                        Services
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium relative group transition-colors">
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>
                <button className="md:hidden text-gray-600 text-2xl" aria-label="Menu">
                    ☰
                </button>
            </div>
        </nav>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
            <Topbar />
            <Navbar />

            <motion.div 
                className="max-w-4xl mx-auto pt-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Error Message Section */}
                <motion.div variants={itemVariants} className="text-center mt-12">
                    <h1 className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                        404
                    </h1>
                    <h2 className="text-4xl font-bold mt-4 text-gray-900 tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
                        Looks like you've ventured into uncharted territory. Let's get you back on track!
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-4 mt-8"
                >
                    <Link 
                        to="/" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        Return Home
                    </Link>
                    <Link 
                        to="/contact" 
                        className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg border border-gray-200 hover:-translate-y-1 transition-all duration-300"
                    >
                        Contact Support
                    </Link>
                </motion.div>

                {/* Search Section */}
                <motion.div variants={itemVariants} className="mt-12">
                    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                        <input
                            type="search"
                            placeholder="Search for something else..."
                            className="w-full px-6 py-4 border border-gray-200 rounded-full shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </motion.div>

                {/* Suggested Links */}
                <motion.div variants={itemVariants} className="mt-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Try these pages instead:</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {suggestedLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-blue-600 transition-all duration-300 text-gray-700"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-12 bg-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Still Lost? Contact Us</h3>
                    <form onSubmit={handleContactFormSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Tell us what happened..."
                            className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 h-32 resize-none"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
                                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
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