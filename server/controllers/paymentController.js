import Stripe from "stripe";
import { sequelize } from "../config/db.js";
import Transaction from "../models/Transaction.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Process payment with Stripe
 * @param {Object} params
 * @param {number} params.user_id
 * @param {number} params.amount
 * @param {string} params.payment_method_id  // from frontend
 */
export const processPayment = async ({ user_id, amount, payment_method_id }) => {
  const t = await sequelize.transaction();

  try {
    // 1. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: "usd",
      payment_method: payment_method_id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    // 2. Save transaction in DB
    const transaction = await Transaction.create(
      {
        transaction_status: paymentIntent.status === "succeeded" ? "success" : "failed",
        amount,
        transaction_date: new Date(),
        transaction_type: "stripe",
      },
      { transaction: t }
    );

    await t.commit();

    return {
      success: paymentIntent.status === "succeeded",
      transaction_id: transaction.transaction_id,
      stripe_payment_intent_id: paymentIntent.id,
    };
  } catch (err) {
    await t.rollback();

    return {
      success: false,
      error: err.message,
    };
  }
};