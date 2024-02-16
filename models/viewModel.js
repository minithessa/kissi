const pool = require("../database/");
const viewModel = {};




viewModel.addview = async function(account_id, inv_id, view_comment){
    try {
        const sql =
          "insert into public.view ( account_id, inv_id, view_comment) values ($1, $2, $3) RETURNING *";
        const data = await pool.query(sql, [
          account_id, inv_id, view_comment
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("add view error: " + error);
      }
}

viewModel.updateview = async function(view_comment, view_id){
    try {
        const sql =
          "UPDATE public.view SET view_comment = $1 WHERE view_id = $2 RETURNING *";
        const data = await pool.query(sql, [
          view_comment,
          view_id,
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("update view error: " + error);
      }
}
viewModel.deleteview = async function(view_id){
    try {
        const sql =
          "delete from public.view WHERE view_id = $1 RETURNING *";
        const data = await pool.query(sql, [
          view_id,
        ]);
        return data.rows[0];
      } catch (error) {
        console.error("delete view error: " + error);
      }
}
viewModel.getviewByInvId = async function(inv_id){
    try {
        const sql =
          `SELECT 
                view_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                v.view_comment,
                to_char(v.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                view v
            JOIN 
                account a ON a.account_id = v.account_id
            JOIN 
                inventory i ON i.inv_id = v.inv_id
            WHERE
                v.inv_id = $1`;
        const data = await pool.query(sql, [
          inv_id
        ]);
        return data.rows;
      } catch (error) {
        console.error("getviesByInvId error: " + error);
      }
}
viewModel.getviewByAccountId = async function(account_id){
    try {
        const sql =
          `SELECT 
                view_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                v.view_comment,
                to_char(v.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                view v
            JOIN 
                account a ON a.account_id = v.account_id
            JOIN 
                inventory i ON i.inv_id = v.inv_id
            WHERE 
                v.account_id = $1;`;
        const data = await pool.query(sql, [
          account_id,
        ]);
        return data.rows;
      } catch (error) {
        console.error("getviewByAccountId error: " + error);
      }
}
viewModel.getviewByviewId = async function(view_id){
    try {
        const sql =
          `SELECT 
                view_id,
                (a.account_firstname || ' ' || a.account_lastname) AS username,
                (i.inv_year || ' ' || i.inv_make || ' ' || i.inv_model) AS title,
                v.view_comment,
                to_char(v.timestamp, 'Day, Month DDth, YYYY at HH12:MIam') AS formatted_timestamp
            FROM 
                view v
            JOIN 
                account a ON a.account_id = v.account_id
            JOIN 
                inventory i ON i.inv_id = v.inv_id
            WHERE 
                v.view_id = $1;`;
        const data = await pool.query(sql, [
          view_id,
        ]);
        return data.rows;
      } catch (error) {
        console.error("getviewByviewId error: " + error);
      }
}

module.exports = viewModel;
