import mysql from "mysql2/promise";

  // export const db = mysql.createPool({
  //   host: "localhost",
  //   user: "root",
  //   password: "root",
  //   database: "sag",
  //   waitForConnections: true,
  //   connectionLimit: 10,
  // });


export const db = mysql.createPool({
  host: "srv1822.hstgr.io",
  user: "u811373606_sag",
  password: "sag.Hello.1180",
  database: "u811373606_sag",
  waitForConnections: true,
  connectionLimit: 10,
});
