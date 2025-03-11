// import React from 'react'
// import LuxoraButton from "../components/LuxoraButton"
// import { useState } from 'react';
// import register from "../assets/register.webp" 
// import { Link } from 'react-router-dom';
// import { registerUser } from "../redux/slices/authSlice";
// import { useDispatch } from "react-redux";


// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();


// const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser({ name, email, password }));
// };


//   return (
//     <div className="flex ">
//     <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
//     <form onSumbit={handleSubmit} className="w-full max-w-md bg-white  p-8 rounded-lg border shadow-sm">
//         <div className="flex justify-center mb-6 ">
//             <h2 className=" text-xl font-medium ">
//                 <LuxoraButton />
//             </h2>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-6 "> Hey there! 👋</h2>
//         <p className="text-center mb-6">
//             Enter your username or password to Login.
//         </p>
//         <div className="mb-4">
//             <label className="block text-sm font-semibold mb-2"> Name</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded" placeholder="Enter your Name" />
//         </div>

//         <div className="mb-4">
//             <label className="block text-sm font-semibold mb-2"> Email</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded" placeholder="Enter your email address" />
//         </div>
//         <div className="mb-4">
//             <label className="block text-sm font-semibold mb-2">Password</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded" placeholder="Enter your password"/>
//         </div>
//         <button type="submit" className="w-full bg-black  text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
//             Sign Up
//         </button>
//         <p className="mt-6 text-center text-sm">
//             Don't have account?{" "}
//             <Link to="/login" className="text-blue-500">
//             Login 
//             </Link>
//         </p>
//     </form>
//     </div>

//     <div className="hidden md:block w-1/2 bg-gray-800">
//     <div className="h-full flex flex-col justify-center items-center">
//         <img src={register} alt="Login to Account " className="h-[750px] w-full object-cover" />
//     </div>
//     </div>
//      </div> 
//   )
// }

// export default Register

////////////////////////////

import React from 'react';
import LuxoraButton from "../components/LuxoraButton";
import { useState } from 'react';
import registerImage from "../assets/register.webp"; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    // Add selector to get auth state
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the registerUser action and handle the response
        dispatch(registerUser({ name, email, password }))
            .unwrap() // unwrap allows us to handle the promise
            .then(() => {
                // Success handling (e.g., redirect to login)
                console.log('Registration successful');
            })
            .catch((err) => {
                // Error handling
                console.error('Registration failed:', err);
            });
    };

    return (
        <div className="flex min-h-screen"> {/* Added min-h-screen for full height */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form 
                    onSubmit={handleSubmit} // Fixed typo: onSumbit -> onSubmit
                    className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
                >
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-medium">
                            <LuxoraButton />
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
                    <p className="text-center mb-6">
                        Enter your details to create an account.
                    </p>

                    {/* Display error message if exists */}
                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded" 
                            placeholder="Enter your Name"
                            required // Added required validation
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded" 
                            placeholder="Enter your email address"
                            required // Added required validation
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded" 
                            placeholder="Enter your password"
                            required // Added required validation
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500">
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img 
                        src={registerImage} 
                        alt="Register for Account" 
                        className="h-[750px] w-full object-cover" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;