

//////////////////////////////////


import React, { useState, useEffect } from 'react';
import LuxoraButton from "../components/LuxoraButton";
import login from "../assets/login.webp";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading, error } = useSelector((state) => state.auth); 
    const { cart } = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something 
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    // Navigate after successful login
    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
              
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, dispatch, navigate, isCheckoutRedirect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) return; 
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
                    noValidate 
                >
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">
                            <LuxoraButton />
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
                    <p className="text-center mb-6">
                        Enter your email and password to login.
                    </p>
                    {error && (
                        <p className="text-red-500 text-center mb-4" role="alert">
                            {error}
                        </p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                            required
                            disabled={loading}
                            aria-describedby={error ? "email-error" : undefined}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                            aria-describedby={error ? "password-error" : undefined}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-black text-white p-2 rounded-lg font-semibold transition ${
                            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <Link
                            to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img
                        src={login}
                        alt="Login to Account"
                        className="h-[750px] w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;