const Order = require("../models/order.model")
const orderItems = require("../models/orderItems.model")

const createOrder = async (req, res) => {
    try {

        const {
            userId, orderItem, shippingAddress, paymentDetails
        } = req.body;



        const orderItemsFound = await orderItems.find({ '_id': { $in: orderItem } });


        if (orderItemsFound.length !== orderItem.length) {
            throw new Error('One or more order items are invalid.');
        }

        console.log(orderItemsFound, "orderItemsFoundorderItemsFound")
        // Step 2: Calculate the total price, total discount, and total item count
        const totalPrice = orderItemsFound.reduce((acc, item) => parseInt(acc) + parseInt(item.Price) * parseInt(item.quantity), 0);
        const totalDiscountPrice = orderItemsFound.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
        const totalItem = orderItemsFound.reduce((acc, item) => acc + item.quantity, 0);

        console.log(totalPrice, totalDiscountPrice, totalItem, "totalPrice, totalDiscountPrice, totalItem")

        // Step 3: Create a new Order
        const newOrder = new Order({
            user: userId,
            orderItems: [...orderItem],
            totalPrice: 0,
            totalDiscountPrice: totalDiscountPrice,
            discount: (totalPrice - totalDiscountPrice),
            shippingAddress: shippingAddress,
            paymentDetails: paymentDetails,
            totalItem: totalItem,
            orderDate: Date.now(),
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            orderStatus: "Deilvered" // Default to 7 days from now
        });

        // Step 4: Save the order to the database
        const savedOrder = await newOrder.save();
        return res.status(201).json({ message: 'Order Created successfully', Order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    createOrder
}