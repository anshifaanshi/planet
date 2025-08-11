const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY'); // Use env var in production

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents (e.g. 1000 = $10.00)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
