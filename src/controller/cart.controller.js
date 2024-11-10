const cartService = require('../services/cart.service.js');

exports.addItemsToCart = async (req, res) => {
    const { cartId, userId, item: itemsToAdd } = req.body;

    try {
        // Call the service to handle adding items to the cart
        const updatedCart = await cartService.addItemsToCartService({ cartId, userId, itemsToAdd });

        // Respond with the updated cart information
        res.json({
            ...updatedCart,
            message: "Items added to cart successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding items to the cart" });
    }
};

exports.deleteItemFromCart = async (req, res) => {
    const { cartId, userId, cartItemId } = req.body;

    try {
        const updatedCart = await cartService.deleteItemFromCartService({ cartId, userId, cartItemId });

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart or item not found" });
        }

        res.json({
            cartId: updatedCart._id,
            cartItems: updatedCart.cartItems,
            totalPrice: updatedCart.totalPrice,
            totalItems: updatedCart.totalItems,
            totalDiscountPrice: updatedCart.totalDiscountPrice,
            discounts: updatedCart.discounts,
            message: "Item deleted from cart successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting item from the cart" });
    }
};

