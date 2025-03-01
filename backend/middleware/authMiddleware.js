// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//     let token;
    
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
//             req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
//             next();
            
//         } catch (error) {
//             console.error("Token verification failed:", error);
//             res.status(401).json({ message: "Not authorized, token failed" });
//         }   
//     } else {
//         res.status(401).json({ message: "Not authorized, no token provided" });
//     }
// };

// module.exports = { protect };





const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded); // Add this for debugging
            
            req.user = await User.findById(decoded.id).select("-password"); // Adjusted to match payload
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }   
    } else {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// MiddleWare to Check if the user is an admin 
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();

    } else {
        res.status(403).json({ message: "Not authorized as a admin"});
    }

};


module.exports = { protect,admin  };