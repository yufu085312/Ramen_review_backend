const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/review'); // ルートのインポート
// const adminRoutes = require('./path/to/adminMiddleware'); // 管理者用ルートのインポート

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ramen_review')
    .then(() => console.log('MongoDBに接続しました。'))
    .catch(err => console.error('MongoDBへの接続に失敗しました。', err));

app.get('/', (req, res) => {
    res.send('ラーメンレビューAPIへようこそ');
});

app.use('/reviews', reviewRoutes);

// requireAdmin 関数の実装が必要
// app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました。`);
});