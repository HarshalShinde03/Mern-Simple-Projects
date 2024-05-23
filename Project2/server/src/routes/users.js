const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users');
const z = require('zod')

const validateReq = (input) =>{
    const schema = z.object({
        username : z.string().email(),
        password : z.string().min(6)
    })
    return schema.safeParse(input);
}


const router = express.Router();

router.post('/register', async(req,res)=>{
    const validationResult = validateReq(req.body);
    console.log(validationResult.error)

  if (!validationResult.success) {
    return res.status(400).json({ message: "Invalid input", errors: validationResult.error.errors });
  }
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({username, password:hashedPassword});
    await newUser.save();

    res.json({message : "User registered successfully"});
});


router.post('/login', async(req,res)=>{
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(!user){
        return res.status(401).json({message : "User does not exists"});
    }

    const isPassValid = await bcrypt.compare(password,user.password);

    if(!isPassValid){
        return res.status(401).json({message : "Username or Password is incorrect"});
    }

    const token = jwt.sign({id: user._id},"secret");

    res.json({token, userID:user._id});
});




module.exports = router;