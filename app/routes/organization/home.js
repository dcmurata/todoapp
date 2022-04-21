const express = require('express');
const router = express.Router();
const list = require("../../src/tasks/list.js");


router.get('/', async function (req, res, next) {
    if (req.session.organization_id) {

        const listTasks = await list.getListTasks();

        res.render('organization/home', {
            title: '管理者ホーム',
            sid: req.session.organization_id,
            category: listTasks.categories
        });
    } else {
        res.redirect('login');
    }
});


module.exports = router;