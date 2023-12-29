const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/review');
const cors = require('cors'); // CORSミドルウェアをインポート
require('dotenv').config();

const app = express();
app.use(express.json());

// CORSを設定
app.use(cors());

function connectWithRetry() {
    mongoose.connect('mongodb://localhost:27017/ramen_review', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDBに接続しました。'))
        .catch(err => {
            console.error('MongoDBへの接続に失敗しました。', err);
            setTimeout(connectWithRetry, 5000); // 5秒後に再試行
        });
}

connectWithRetry();

const morgan = require('morgan');
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('ラーメンレビューAPIへようこそ');
});

app.use('/reviews', reviewRoutes);

const hotPepperRoutes = require('./routes/hotPepperRoutes');
app.use('/api/hotpepper', hotPepperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました。`);
});