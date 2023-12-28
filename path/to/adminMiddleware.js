// requireAdmin 関数の定義
function requireAdmin(req, res, next) {
    // 管理者認証のロジックを実装します
    // この例では、認証ロジックが仮置きされています
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    } else {
        return res.status(401).send('管理者のみアクセス可能です');
    }
}
module.exports = requireAdmin;