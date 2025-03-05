// const express = require("express");
// const Checkout = require("../models/Checkout");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const Order = require("../models/Order");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router()

// // @route POST /api/checkout
// // @desc Create a new checkout session
// // @access Private
// router.post("/", protect, async (req, res) => {
//     const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = 
//     req.body; 
     
//     if (!checkoutItems || checkoutItems.length === 0) {
//         return res.status(400).json({ message: "no items in checkout"});
//     }

//     try {
//         // Create a new checkout session 
//         const newCheckout = await Checkout.create({
//             user: req.user._id,
//             checkoutItems: checkoutItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             paymentStatus: "Pending",
//             isPaid: false,
//         });
//         console.log(`Checkout created for user: ${req.user._id}`);
//         res.status(201).json(newCheckout);
//     } catch (error) {
//         console.error("Error Creating checkout session:", error);
//         res.status(500).json({ message: "Server Error"});

//     }

// });

// // @route PUT /api/checkout/:id/pay
// // @desc Update checkout to mark as paid after successful payment
// // @access Private
// router.put("/:id/pay", protect, async (req, res) => {
//     const { paymentStatus, paymentDetails } = req.body;

//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });

//         }
      
//         if(paymentStatus === "paid") {
//             checkout.isPaid = true;
//         }

//         if (paymentStatus === "paid") {
//             checkout.isPaid = true;
//             checkout.paymentStatus = paymentStatus;
//             checkout.paymentDetails = paymentDetails;
//             checkout.paidAt = Date.now();
//             await checkout.save();

//             res.status(200).json(checkout);
        
//         } else {
//             res.status(400).json({ message: "Invalid Payment Status"});
//         }
      
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });              
//     }
// });

// // @route POST /api/checkout/:id/finalize
// // @desc Finalize checkout and convert to an order after payment confiramtion
// router.post("./:id/finalize", protect, async (req, res) => {
//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });

//         }
//        if (checkout.isPaid && !checkout.isFinalized) {
//         // Create final order based on the checkout details
//         const finalOrder = await Order.create({
//             user: checkout.user,
//             orderItems: checkout.checkoutItems,
//             shippingAddress: checkout.shippingAddress,
//             paymentMethod: checkout.paymentMethod,
//             totalPrice: checkout.totalPrice,
//             isPaid: true,
//             paidAt: checkout.paidAt,
//             isDelivered: false,
//             paymentStatus: "paid",
//             paymentDetails: checkout.paymentDetails,

//         });

//         // Mark the checkout as finalized
//         checkout.isFinalized = true;
//         checkout.finalizedAt =  Date.now();
//         await checkout.save();
        
//            // Delete the cart associated with the user
//            await Cart.findOneAndDelete({ user: checkout.user });
//            res.status(201).json(finalOrder);

//        } else if (checkout.isFinalized) {
//         res.status(400).json({ message: "Checkout already finalized" });
//        } else {
//         res.status(400).json({ message: "Checkout is not paid" });
//        }
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }

// });

// module.exports = router;



///////////////////////

const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || !Array.isArray(checkoutItems) || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }

    const isValidItems = checkoutItems.every(item => 
        item.productId && 
        item.name && typeof item.name === "string" && 
        item.image && typeof item.image === "string" && 
        item.price !== undefined && typeof item.price === "number" && 
        item.quantity !== undefined && typeof item.quantity === "number" && item.quantity >= 1
    );

    if (!isValidItems) {
        return res.status(400).json({ 
            message: "All checkout items must have productId, name, image, price, and quantity with valid types" 
        });
    }

    if (!shippingAddress || 
        !shippingAddress.address || 
        !shippingAddress.city || 
        !shippingAddress.postalCode || 
        !shippingAddress.country) {
        return res.status(400).json({ message: "Shipping address must include address, city, postalCode, and country" });
    }

    try {
        for (const item of checkoutItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ message: `Product ${item.productId} not found` });
            }
        }

        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ 
            message: "Server Error", 
            details: error.message 
        });
    }
});

// @route PUT /api/checkout/:id/pay
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus !== "paid") {
            return res.status(400).json({ message: "Invalid payment status" });
        }

        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();
        await checkout.save({ validateModifiedOnly: true });
        res.status(200).json(checkout);
    } catch (error) {
        console.error("Error updating checkout payment:", error);
        res.status(500).json({ 
            message: "Server Error", 
            details: error.message 
        });
    }
});

// @route POST /api/checkout/:id/finalize
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        console.log(`Finalizing order for checkout: ${checkout._id}`);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (!checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is not paid" });
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" });
        }

        const orderItems = await Promise.all(
            checkout.checkoutItems.map(async (item) => {
                const product = await Product.findById(item.productId).select("name image price");
                if (!product) {
                    console.warn(`Product ${item.productId} not found, using defaults for order item`);
                    return {
                        productId: item.productId,
                        name: item.name || "Unknown Product",
                        quantity: item.quantity || 1,
                        image: item.image || "",
                        price: item.price || 0
                    };
                }
                return {
                    productId: item.productId,
                    name: item.name || product.name,
                    quantity: item.quantity || 1,
                    image: item.image || product.image,
                    price: item.price || product.price
                };
            })
        );

        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems,
            shippingAddress: {
                address: checkout.shippingAddress.address,
                city: checkout.shippingAddress.city,
                postalCode: checkout.shippingAddress.postalCode,
                country: checkout.shippingAddress.country || "Unknown" // Fallback for legacy data
            },
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: true,
            paidAt: checkout.paidAt,
            isDelivered: false,
            paymentStatus: "paid",
            paymentDetails: checkout.paymentDetails,
        });

        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save({ validateModifiedOnly: true });
        await Cart.findOneAndDelete({ user: checkout.user });
        res.status(201).json(finalOrder);
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ 
                message: "Validation Error", 
                details: error.message 
            });
        }
        res.status(500).json({ 
            message: "Server Error", 
            details: error.message 
        });
    }
});

module.exports = router;