const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.organization_id) {
        res.render('organization/home', {
            title: '管理者ホーム'
        });
    } else {
        res.redirect('login');
    }
});


module.exports = router;