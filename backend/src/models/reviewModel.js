import mongoose from 'mongoose';
// Define the schema for Review
const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating for the book, 1 to 5 stars
  comment: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

// Register the model with Mongoose
const Review = mongoose.model("Review", reviewSchema);

export default Review;