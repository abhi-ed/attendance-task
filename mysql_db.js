const mysql = require('mysql');
let db_client = {}
db_client = mysql.createConnection({
    host:process.env.MYSQL_IP,
    user : 'root',
    port:3306,
    password : process.env.MYSQL_PSW,
    database : process.env.MYSQL_DB
})
 
db_client.connect()

async function runQuery(qry) {
  try {
    return new Promise((resolve,reject) =>{
      db_client.query(qry,function (err,results,fields) {
        if(err){
          reject(err)
        }
        if(results){
          resolve(results)
        }
      })
    })  
  } catch (e) {
    console.log("error in getQuery",e)
    return []
  }
}
module.exports ={
    db_client,
    runQuery
}

