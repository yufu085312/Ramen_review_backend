const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    write_name: String,
    review_points: Number,
    review: String,
    hotpepperId: String, // この行を追加
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);