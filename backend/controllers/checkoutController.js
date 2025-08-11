// controllers/checkoutController.js
import Order from "../models/order.js";
import Cart from "../models/Booking.js";

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalAmount,
      status: "Pending"
    });

    await order.save();
    await Cart.deleteOne({ user: req.user.id });

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
