const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('organization/home', {
        title: '管理者ホーム'
    });
});


module.exports = router;