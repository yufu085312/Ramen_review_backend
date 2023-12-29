// routes/hotPepperRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/ramen_shops', async(req, res) => {
    const query = req.query.query || ''; // クエリパラメータから検索クエリを取得
    try {
        const response = await axios.get('http://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
            params: {
                key: process.env.HOTPEPPER_API_KEY, // 環境変数からAPIキーを取得
                format: 'json',
                // その他の必要なパラメータをここに追加
                genre: 'G013', // ラーメンのジャンルコード
                keyword: query, // 検索クエリをパラメータに追加
            }
        });
        console.log(response.data.results); // レスポンスの詳細情報をログ出力
        if (response.data.results.error) {
            console.error('エラー詳細:', response.data.results.error);
        }
        res.json(response.data.results.shop);
    } catch (err) {
        console.error('ホットペッパーAPIリクエストエラー:', err);
        res.status(500).send('APIリクエストに失敗しました。');
    }
});

module.exports = router;