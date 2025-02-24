// const jwt  = require("jsonwebtoken");
// const User = require("../models/User");

// // MiddleWare to protect routes
// const protect = async (req, resizeBy, next ) => {
//     let token;

//     if (
//         req.headers.authorization &&
//        req.headers.authorization.startWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split("")[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
//             req.user = await User.findById(decoded.user.id).select("-password");  // Exclude password
//             next();
//         } catch (error) {
//          console.error("Token verification failed", error);
//          resizeBy.status(401).json({ message: "Not authorized, token failed"});
     

//         }
//     } else {
//         resizeBy.status(401).json({ message: "Not authorizes, no token provided"});
//     }
// };


// module.exports = { protect};

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user and exclude password
            req.user = await User.findById(decoded.user.id).select("-password");

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error("Token verification failed", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// ✅ Correct export
module.exports = { protect };
