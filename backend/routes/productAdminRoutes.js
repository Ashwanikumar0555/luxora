// const express = require("express");
// const Product = require("../models/Product");
// const { Protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// // @route GET /api/admin/products
// // @desc Get all products (Adminonly)
// // @access Private/Admin
// router.get("/", protect, admin, async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// })

// module.exports = router;


const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware"); // Fixed 'Protect' to 'protect'

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;