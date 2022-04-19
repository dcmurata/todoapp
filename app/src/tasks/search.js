// 一覧取得の処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

postSearchTask = async function (body) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);

        const search_items = body.search_items;
        const search_opt = body.search_opt;
        const search_sort = body.search_sort


        let sql =
            `SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at 
        FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE`;

        let d = [];

        if (search_items.length == 0) {
            sql += ' 1 = 1';
        } else {
            for (const item of search_items) {

                if (item === 'done') {
                    sql += ' t_task.task_status = ? AND';
                    d.push(1);
                } else if (item === 'progress') {
                    sql += ' t_task.task_status = ? AND';
                    d.push(2);
                } else if (item === 'untouched') {
                    sql += ' t_task.task_status = ? AND';
                    d.push(3);
                } else if (item === 'life') {
                    sql += ' t_task.category_id = ? AND';
                    d.push(1);
                } else if (item === 'study') {
                    sql += ' t_task.category_id = ? AND';
                    d.push(2);
                } else if (item === 'work') {
                    sql += ' t_task.category_id = ? AND';
                    d.push(3);
                } else if (item === 'hobby') {
                    sql += ' t_task.category_id = ? AND';
                    d.push(4);
                }
            }
        }
        sql = rtrim(sql, 'AND');
        sql += ` ORDER BY ${search_opt} ${search_sort}`;

        const [list, fields] = await connection.query(sql, d);
        return list;

        function rtrim(string, trimString) {
            string = String(string);
            trimString = String(trimString);
            let i = string.length - trimString.length;

            return string.lastIndexOf(trimString, i) === i ? string.slice(0, i) : string;
        }
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.postSearchTask = postSearchTask;