const con = require('../db/connections')

const createVisitorRecord = async (visitor_id, today, month, year) => {
    var sql_create_record = `INSERT INTO visitors (visitor_id, today, month, year) VALUES (?, ?, ?, ?)`;
    con.query(sql_create_record, [visitor_id, today, month, year], function (err, result) {
      if (err) throw err;
  
    });
}

const websiteReport = async () => {

  let d = new Date();
  let dateArr = d.toString().split(' ');

  let day = dateArr[0];
  let month =  dateArr[1];
  let days =  dateArr[2];
  let year =  dateArr[3];

  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(today) AS todayViews, COUNT(month) AS monthlyViews, COUNT(year) AS yearlyViews FROM visitors WHERE day = '${day}' AND month = '${month}' AND year = '${year}'`;
    con.query(query, async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

}

module.exports = {
  createVisitorRecord,
  websiteReport
}