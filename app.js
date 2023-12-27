const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // JSONのパース用

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/reviews')
    .then(() => console.log('MongoDBに接続しました。'))
    .catch(err => console.error('MongoDBへの接続に失敗しました。', err));

// データモデルの定義
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    write_name: String,
    review_points: Number,
    review: String,
    created_at: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

// ルートURLへのGETリクエストに対するハンドラ
app.get('/', (req, res) => {
    res.send('ラーメンレビューAPIへようこそ');
});

// CRUD操作のルート定義
// Create
app.post('/reviews', (req, res) => {
    Review.create(req.body, (err, review) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(review);
        }
    });
});

// Read
app.get('/reviews', (req, res) => {
    Review.find({}, (err, reviews) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(reviews);
        }
    });
});

// Update
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, review) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(review);
        }
    });
});

// Delete
app.delete('/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send('削除されました');
        }
    });
});

// サーバーの起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました。`);
});