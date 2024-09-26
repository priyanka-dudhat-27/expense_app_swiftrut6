import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Entertainment', 'Health', 'Utilities', 'Other'],
    required: [true, 'Category is required'],
  },
  paymentType: {
    type: String,
    enum: ['cash', 'credit'],
    required: true,
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
