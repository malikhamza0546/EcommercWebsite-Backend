const Cart = require("../models/cart.model")
const CartItem = require("../models/cartItem.model.js")

const createCart = async (user) => {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const addItemsToCartService = async ({ cartId, userId, itemsToAdd }) => {
    let cart;

    // Find existing cart by cartId, or by userId if cartId is not provided
    if (cartId) {
        cart = await Cart.findById(cartId);
    } else {
        cart = await Cart.findOne({ user: userId });
    }

    // If cart doesn't exist, create a new one
    if (!cart) {
        cart = await createCart(userId);
    }

    let newCartItems = [];

    // Process each item in the request
    for (const item of itemsToAdd) {
        const { productId, size, quantity, price, discountedPrice } = item;

        // Create a new CartItem for each product
        const cartItem = new CartItem({
            CartItem: cart._id,
            product: productId,
            size,
            quantity,
            price,
            discountedPrice,
            userId
        });

        // Save each CartItem and collect their IDs
        const savedCartItem = await cartItem.save();
        newCartItems.push(savedCartItem._id);

        // Update cart totals
        cart.totalPrice += price * quantity;
        cart.totalDiscountPrice += discountedPrice * quantity;
        cart.totalItems += quantity;
        cart.discounts += (price - discountedPrice) * quantity;
    }

    // Add new CartItems to the cart's cartItems array
    cart.cartItems.push(...newCartItems);

    // Save the updated cart
    await cart.save();

    // Return the updated cart data
    return {
        cartId: cart._id,
        userId: cart.user,
        cartItems: cart.cartItems,
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems,
        totalDiscountPrice: cart.totalDiscountPrice,
        discounts: cart.discounts
    };
};


const deleteItemFromCartService = async ({ cartId, userId, cartItemId }) => {
    let cart = await Cart.findById(cartId);
    console.log(cart, "cartcartcart");

    // Check if the cart and user exist
    if (!cart || cart.user.toString() !== userId) {
        throw new Error("Cart or user not found");
    }

    // Find the CartItem in the cartItems array using cartItemId
    const cartItemIndex = cart.cartItems.findIndex((item) => {

        return item.toString() == cartItemId;
    });
    console.log(cartItemIndex, "cartItemIndex");
    if (cartItemIndex === -1) {
        throw new Error("Item not found in cart");
    }

    // Remove the CartItem from the cart
    const removedCartItemId = cart.cartItems.splice(cartItemIndex, 1)[0];
    const removedCartItem = await CartItem.findByIdAndDelete(removedCartItemId);

    // Update cart totals
    if (removedCartItem) {
        cart.totalPrice -= removedCartItem.price * removedCartItem.quantity;
        cart.totalDiscountPrice -= removedCartItem.discountedPrice * removedCartItem.quantity;
        cart.totalItems -= removedCartItem.quantity;
        cart.discounts -= (removedCartItem.price - removedCartItem.discountedPrice) * removedCartItem.quantity;
    }

    // Save the updated cart
    await cart.save();

    return cart;
};

// Export the functions to be used in other parts of the application
module.exports = {
    createCart,
    addItemsToCartService,
    deleteItemFromCartService
};