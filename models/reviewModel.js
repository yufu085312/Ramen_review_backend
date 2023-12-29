const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    write_name: String,
    review_points: Number,
    review: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);