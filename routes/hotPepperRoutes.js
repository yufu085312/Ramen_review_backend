// routes/hotPepperRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/shops', async(req, res) => {
    const { query, lat, lng, radius } = req.query; // クエリパラメータを取得

    try {
        let apiParams = {
            key: process.env.HOTPEPPER_API_KEY,
            format: 'json',
            genre: 'G013', // ラーメンのジャンルコード
            count: 100
        };

        // 検索クエリがある場合は、それを使用
        if (query) {
            apiParams.keyword = query;
        }

        // 緯度と経度がある場合は、それらを使用
        if (lat && lng) {
            apiParams.lat = lat;
            apiParams.lng = lng;
            apiParams.range = radius || 3; // 検索半径を設定（デフォルト値として3を設定）
        }

        const response = await axios.get('http://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
            params: apiParams
        });

        console.log(response.data.results); // レスポンスの詳細情報をログ出力

        // レスポンスの処理
        if (response.data.results.error) {
            console.error('エラー詳細:', response.data.results.error);
            res.status(400).send('クエリが不適切です。');
            return;
        }

        res.json(response.data.results.shop);
    } catch (err) {
        // エラーハンドリング
        console.error('ホットペッパーAPIリクエストエラー:', err);
        res.status(500).send('APIリクエストに失敗しました。');
    }
});

module.exports = router;