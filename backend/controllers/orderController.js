import orderModel from "../models/orderModel.js";
import userModel from ".././models/userMode.js";

// Place order controller
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;

    // Create a new order
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
    });

    // Save the new order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create line items for the order
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Assuming the price conversion is needed
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a line item
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery fee",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // Return success response
    res.json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error placing order", success: false });
  }
};

export { placeOrder };
