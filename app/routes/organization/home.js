const express = require('express');
const router = express.Router();
const list = require("../../src/tasks/list.js");
const o_list = require("../../src/organization/list.js");


router.get('/', async function (req, res, next) {
    if (req.session.organization_id) {

        const listOrganization = await o_list.getListOrganizations(req.session.organization_id);
        console.log(listOrganization);
        const listTasks = await list.getListTasks();

        res.render('organization/home', {
            title: '管理者ホーム',
            sid: req.session.organization_id,
            category: listTasks.categories,
            o_users: listOrganization
        });
    } else {
        res.redirect('login');
    }
});


module.exports = router;