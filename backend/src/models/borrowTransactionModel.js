import mongoose from 'mongoose';

// Borrow Transaction Schema
const borrowTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    }
});

const BorrowTransaction = mongoose.model('BorrowTransaction', borrowTransactionSchema);

export default BorrowTransaction;
