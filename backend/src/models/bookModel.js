import mongoose from 'mongoose';

// Book Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date
    },
    available: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
    image: {
        type: String,  // URL for storing the image
        required: true // Set to true if an image is mandatory
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
