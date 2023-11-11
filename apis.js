const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const { createSchema, updateSchema, readSchema, deleteSchema } = require("./validation");
const moment = require("moment");
const { runQuery } = require("./mysql_db");
let today_date_time =  moment().format('YYYY-MM-DD HH:mm:ss')

router.get('/', (req, res) => {
    res.status(200).send("MY NODE APP")
})
// bookregistration payload (body in json)


router.post('/attendance', async (req, res) => {
    try {
        let validationError = []
        let body = req.body
        let { error, value:req_data } = createSchema(body)
        error ? validationError.push(error.details) : true
        if (validationError.length == 0) {
            req_data.attendance_date = moment(req_data.attendance_date).format('YYYY-MM-DD')
            let insert_query = `insert into ${process.env.MYSQL_DB}.attendance(user_id,user_name,attendance_date,attendance_type,created_at,updated_at) values(${req_data.user_id},'${req_data.user_name}','${req_data.attendance_date}','${req_data.attendance_type}','${today_date_time}','${today_date_time}')`
            let data = await runQuery(insert_query)
            if(data.affectedRows){
                res.status(200).json({
                    success: true,
                    message: "Attendance marked",
                    id:data.insertId
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: "Error while marking attendance"
                })
            }
            
        } else {
            res.status(400).json({
                success: false,
                message: "Validation error !!",
                validationError: validationError
            })
        }
    } catch (e) {
        if(e.errno){
            res.status(400).json({
                success: false,
                message: e.sqlMessage
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
})

router.get('/attendance', async (req, res) => {
    let validationError = []
    let query = req.query
    let { error, value:req_data } = readSchema(query)
    error ? validationError.push(error.details) : true
    try {
        if (validationError.length == 0) {
            let select_query = `select * from ${process.env.MYSQL_DB}.attendance `
            if (req_data.user_id) {
                select_query += `where user_id = ${req_data.user_id}`
            }
            if (req_data.attendance_date) {
                req_data.attendance_date = moment(req_data.attendance_date).format('YYYY-MM-DD')
                select_query += `where attendance_date = '${req_data.attendance_date}'`
            }
            select_query += ` ORDER BY attendance_date desc`
            let data = await runQuery(select_query)
            if(data.length){
                res.status(200).json({
                    success: true,
                    message: "data retrieveed succefully",
                    data:data
                })
            }else{
                res.status(200).json({
                    success: false,
                    message: "No data found !!"
                })
            }
            
        } else {
            res.status(400).json({
                success: false,
                message: "Validation error",
                validationError: validationError
            })
        }
    } catch (e) {
        if(e.errno){
            res.status(400).json({
                success: false,
                message: e.sqlMessage
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
        
    }
})


module.exports = router

