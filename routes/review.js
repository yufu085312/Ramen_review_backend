const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

router.get('/', (req, res) => {
    Review.find({})
        .then(reviews => {
            res.json(reviews);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.post('/', async(req, res) => {
    try {
        const newReview = new Review({
            write_name: req.body.write_name,
            review: req.body.review,
            review_points: req.body.review_points,
            hotpepperId: req.body.hotpepperId,
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).send(err);
    }
});

// 特定のラーメン店のレビューを取得するルート
router.get('/shop/:hotpepperId', async(req, res) => {
    try {
        const reviews = await Review.find({ hotpepperId: req.params.hotpepperId });
        res.json(reviews);
    } catch (err) {
        console.error('レビュー取得エラー:', err);
        res.status(500).send(err);
    }
});

module.exports = router;