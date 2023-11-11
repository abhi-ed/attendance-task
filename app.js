const express = require("express");
require("dotenv").config();
const router=require('./apis')
const app=express()
var cors = require('cors');
require("./mysql_db");
app.use(express.json())
app.use(express.text())
app.use(router)
app.use(cors());
const PORT= process.env.PORT || 3000
app.listen(PORT,console.log(`BACKEND SERVER IS RUNNING ON PORT ${PORT}`))
