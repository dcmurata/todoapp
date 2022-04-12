// 新規登録処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

postCreateTasks = async function (body) {

    let connection = null;

    try {
        connection = await mysql.createConnection(config.dbSetting);
        const sql = "INSERT INTO `t_task`(`task_name`,`deadline`,`category_id`) VALUES(?,?,?);";

        let d = [body.taskName, body.deadline, body.category];
        const [rows, fields] = await connection.query(sql, d);

        return rows;
    } catch (err) {
        console.log("エラー" + err);
    } finally {
        connection.end();
    }
};

exports.postCreateTasks = postCreateTasks;