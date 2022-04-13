var express = require("express");
const items = require("../../src/items");
const create = require("../../src/tasks/create.js");
const list = require("../../src/tasks/list.js");
const update = require("../../src/tasks/update.js");
const del = require("../../src/tasks/delete.js");
var router = express.Router();

/* 商品一覧を取得するルーティング */
router.get("/items", function (req, res, next) {
  const itemsList = items.getListItem();
  res.send(itemsList);
});

/*１件の商品情報を取得するルーティング */
router.get("/items/:id", function (req, res, next) {
  const item = items.getItem(req.params.id);
  res.send(item);
});

/* タスクを登録するルーティング */
router.post("/tasks", async function (req, res, next) {
  console.log(req.body);
  const createTask = await create.postCreateTasks(req.body)
  res.send(createTask);
});

/* タスク一覧を取得するルーティング*/
router.get("/task-list", async function (req, res, next) {
  const listTasks = await list.getListTasks();
  res.send(JSON.stringify(listTasks));
});

/* タスクを1件更新するルーティング */
router.patch("/tasks/:id", async function (req, res, next) {
  const patchTasksId = await update.patchTasksId(req.params.id, req.body);
  res.send(patchTasksId);
});

/* タスク一覧を削除するルーティング */
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = await del.deleteTasksId(req.params.id);
  res.send(deleteTasksId);
});

module.exports = router;
