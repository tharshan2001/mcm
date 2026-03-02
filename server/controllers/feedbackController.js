import Feedback from "../models/Feedback.js";

/** CREATE feedback */
export const createFeedback = async (req, res) => {
  try {
    const { product_id, rating, comments } = req.body;
    const user_id = req.user.user_id; // assuming user is authenticated

    const feedback = await Feedback.create({ product_id, user_id, rating, comments });
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET all feedbacks */
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** GET feedbacks for a product */
export const getFeedbacksByProduct = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ where: { product_id: req.params.productId } });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** DELETE feedback (Admin) */
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    await feedback.destroy();
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};