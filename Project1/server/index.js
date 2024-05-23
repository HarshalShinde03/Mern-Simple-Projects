const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/employee')

app.post('/login', (req,res)=>{
    // console.log("hiiiiii")
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json({
                    msg : "Success"
                })
            }else{
                res.status(401).json({
                    msg : "Password is incorrect"
                })
            }
        }else{
            res.status(402).json({
                msg: "No record found"
            })
        }
    }).catch(e=>console.log(e))
})

app.post('/register', (req,res)=>{
    console.log(req.body)
    EmployeeModel.create(req.body)
    .then(e=>res.json(e))
    .catch(e=>res.json(e))
})

app.listen(3001, ()=>{
    console.log("Started on 3001");
})