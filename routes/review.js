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


module.exports = router;