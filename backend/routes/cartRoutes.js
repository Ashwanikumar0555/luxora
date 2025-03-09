// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Helper function to get a cart by userId or guestId
// const getCart = async (userId, guestId) => {
//     if (userId) {
//         return await Cart.findOne({ user: userId });
//     } else if (guestId) {
//         return await Cart.findOne({ guestId });
//     }
//     return null;
// };

// // @route POST /api/cart
// // @desc Add a product to the cart for a guest or logged-in user
// // @access Public (Consider making it Private with 'protect' if authentication is required)
// router.post("/", async (req, res) => {
//     const { productId, quantity, size, color, guestId, userId } = req.body;

//     try {
//         // Validate required fields
//         if (!productId || !quantity || !size) {
//             return res.status(400).json({ message: "Product ID, quantity, and size are required" });
//         }

//         // Ensure quantity is a positive number
//         const parsedQuantity = Number(quantity);
//         if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
//             return res.status(400).json({ message: "Quantity must be a positive number" });
//         }

//         // Check if the product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Determine if the user is logged in or a guest and fetch their cart
//         let cart = await getCart(userId, guestId);

//         if (cart) {
//             // If the cart exists, update it
//             const productIndex = cart.products.findIndex(
//                 (p) =>
//                     p.productId.toString() === productId &&
//                     p.size === size &&
//                     (p.color || "") === (color || "") // Handle optional color
//             );

//             if (productIndex > -1) {
//                 // If the product already exists, update the quantity
//                 cart.products[productIndex].quantity += parsedQuantity;
//             } else {
//                 // Add new product to the cart
//                 cart.products.push({
//                     productId,
//                     name: product.name,
//                     image: product.images[0]?.url || "", // Fallback if images array is empty
//                     price: product.price,
//                     size,
//                     color: color || undefined, // Only include color if provided
//                     quantity: parsedQuantity,
//                 });
//             }

//             // Recalculate the total price
//             cart.totalPrice = cart.products.reduce(
//                 (acc, item) => acc + item.price * item.quantity,
//                 0
//             );

//             await cart.save();
//             return res.status(200).json(cart);
//         } else {
//             // Create a new cart for the guest or user
//             const newCart = await Cart.create({
//                 user: userId || undefined, // Ensure nullish value doesn't break schema
//                 guestId: guestId || "guest_" + Date.now(),
//                 products: [
//                     {
//                         productId,
//                         name: product.name,
//                         image: product.images[0]?.url || "", // Fallback if images array is empty
//                         price: product.price,
//                         size,
//                         color: color || undefined, // Only include color if provided
//                         quantity: parsedQuantity,
//                     },
//                 ],
//                 totalPrice: product.price * parsedQuantity,
//             });

//             return res.status(201).json(newCart);
//         }
//     } catch (error) {
//         console.error("POST /api/cart error:", error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// });

// // @route PUT /api/cart
// // @desc Update product quantity in the cart for a guest or logged-in user
// // @access Public (Consider making it Private with 'protect' if authentication is required)
// router.put("/", async (req, res) => {
//     const { productId, quantity, size, color, guestId, userId } = req.body;

//     try {
//         // Validate required fields
//         if (!productId || !quantity || !size) {
//             return res.status(400).json({ message: "Product ID, quantity, and size are required" });
//         }

//         // Ensure quantity is a valid number
//         const parsedQuantity = Number(quantity);
//         if (isNaN(parsedQuantity)) {
//             return res.status(400).json({ message: "Quantity must be a number" });
//         }

//         // Fetch the cart
//         let cart = await getCart(userId, guestId);
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         // Find the product in the cart
//         const productIndex = cart.products.findIndex(
//             (p) =>
//                 p.productId.toString() === productId &&
//                 p.size === size &&
//                 (p.color || "") === (color || "") // Handle optional color
//         );

//         if (productIndex > -1) {
//             if (parsedQuantity > 0) {
//                 // Update quantity if greater than 0
//                 cart.products[productIndex].quantity = parsedQuantity;
//             } else {
//                 // Remove product if quantity is 0 or less
//                 cart.products.splice(productIndex, 1);
//             }

//             // Recalculate the total price
//             cart.totalPrice = cart.products.reduce(
//                 (acc, item) => acc + item.price * item.quantity,
//                 0
//             );

//             await cart.save();
//             return res.status(200).json(cart);
//         } else {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }
//     } catch (error) {
//         console.error("PUT /api/cart error:", error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// });



// // @route DELETE /api/cart
// // @desc Remove a product from the cart 
// // @access Public
// router.delete("/", async (req, res) => {
//     const { productId, size, color, guestId, userId } = req.body;
//     try {
//         let cart = await getCart(userId, guestId);

//         if (!cart) return res.status(404).json({ message: "Cart not found" });

//         const productIndex = cart.products.findIndex(
//             (p) => 
//                 p.productId.toString() === productId &&
//             p.size === size &&
//             p.color === color
//         );

//         if (productIndex > -1) {
//             cart.products.splice(productIndex,1);

//             cart.totalPrice = cart.products.reduce(
//                 (acc, item) => acc + item.price * item.quantity,
//                 0
//             );
//             await cart.save();
//             return res.status(200).json(cart);
//         } else {
//             return res.status(404).json({ message: "Product not found in cart "});
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({message: "Server Error"});
//     }

// });

// // @route GET /api/cart
// // @desc get logged-in user's or guest user's cart 
// // @access Public
// router.get("/", async (req, res) => {
//     const { userId, guestId } = req.query;

//     try {
//         const cart = await getCart(userId, guestId);
//         if (cart) {
//             res.json(cart);

//         } else {
//         res.status(404).json({ message: "Cart not found"});
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error"});
//     }
// });


// // @route POST /api/cart/merge
// // @desc Merge guest cart into user cart on login 
// // @access Private 
// router.post("/merge", protect, async (req, res) => {
//     const { guestId } =req.body;

//     try {
//         // Find the guest  cart and user cart 
//         const guestCart = await Cart.findOne({ guestId });
//         const userCart = await Cart.findOne({ user: req._id });

//         if (guestCart) {
//             if (guestCart.products.length === 0) {
//                 return res.status(400).json({ message: "Guest cart is empty"});

//             }

//             if (useCart) {
//                 //Merge guest cart into user cart 
//                 guestCart.products.forEach((guestItem) => {
//                     const productIndex = useCart.products.findIndex(
//                         (item) => 

//                             item.productId.toString() === guestItem.productId.toString() &&
//                             item.size === guestItem.size && item.color
//                     );

//                     if (productIndex > -1) {

//                         //If the items exists in the user cart, update the quantity
//                         useCart.products[productIndex].quantity += guestItem.quantity;

//                     } else {
//                         // Otherwise, add the guest item to the cart 
//                         userCart.products.push(guestItem);
//                     }
//                 });

//                 userCart.totalPrice = useCart.products.reduce(
//                     (acc, item) => acc + item.price * item.quantity,
//                     0
//                 );
//                 await useCart.save();

//                 // Remove the guest cart after merging
//                 try {
//                     await Cart.findOneAndDelete({ guestId });

//                 } catch (error) {
//                     console.error("Error deleting guest cart:", error);
//                 }
//                 res.status(200).json(useCart);
//             } else {
//                 // if the user has no existing cart, assign the guest cart to the user 
//                 guestCart.user = req.user._id;
//                 guestCart.guestId = undefined;
//                 await guestCart.save();

//                 res.status(200).json(guestCart);
//             }
//         } else {
//             if (useCart) {
//                 // Guest cart has already been merged, return user cart
//                 return res.status(200).json(userCart);
//             }
//             res.status(404).json({ message: "Guest cart not found"});
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error"});
//     }
// });



// module.exports = router;







const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public (Consider making it Private with 'protect' if authentication is required)
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Validate required fields
        if (!productId || !quantity || !size) {
            return res.status(400).json({ message: "Product ID, quantity, and size are required" });
        }

        // Ensure quantity is a positive number
        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ message: "Quantity must be a positive number" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Determine if the user is logged in or a guest and fetch their cart
        let cart = await getCart(userId, guestId);

        if (cart) {
            // If the cart exists, update it
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    (p.color || "") === (color || "") // Handle optional color
            );

            if (productIndex > -1) {
                // If the product already exists, update the quantity
                cart.products[productIndex].quantity += parsedQuantity;
            } else {
                // Add new product to the cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0]?.url || "", // Fallback if images array is empty
                    price: product.price,
                    size,
                    color: color || undefined, // Only include color if provided
                    quantity: parsedQuantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId || undefined, // Ensure nullish value doesn't break schema
                guestId: guestId || "guest_" + Date.now(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0]?.url || "", // Fallback if images array is empty
                        price: product.price,
                        size,
                        color: color || undefined, // Only include color if provided
                        quantity: parsedQuantity,
                    },
                ],
                totalPrice: product.price * parsedQuantity,
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("POST /api/cart error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public (Consider making it Private with 'protect' if authentication is required)
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Validate required fields
        if (!productId || !quantity || !size) {
            return res.status(400).json({ message: "Product ID, quantity, and size are required" });
        }

        // Ensure quantity is a valid number
        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: "Quantity must be a number" });
        }

        // Fetch the cart
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                (p.color || "") === (color || "") // Handle optional color
        );

        if (productIndex > -1) {
            if (parsedQuantity > 0) {
                // Update quantity if greater than 0
                cart.products[productIndex].quantity = parsedQuantity;
            } else {
                // Remove product if quantity is 0 or less
                cart.products.splice(productIndex, 1);
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("PUT /api/cart error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart 
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) => 
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart 
// @access Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login 
// @access Private 
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        // Find the guest cart and user cart 
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id }); // Ensure req.user._id is correct

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                // Merge guest cart into user cart 
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color // Fixed comparison
                    );

                    if (productIndex > -1) {
                        // If the item exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // Otherwise, add the guest item to the cart 
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error("Error deleting guest cart:", error);
                }
                res.status(200).json(userCart);
            } else {
                // If the user has no existing cart, assign the guest cart to the user 
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                // Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error("POST /api/cart/merge error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;