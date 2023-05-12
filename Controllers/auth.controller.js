const {Users }= require('../Models/Users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/api/signup', async (req, res)=>{
    try{
        const {password, email} = req.body;

        const existingUser = Users.findOne({
            where: email
        });

        if (existingUser){
            res.status(409).json({error: 'User already exists'})
        }
        
        const hashPassword = (await bcrypt.hash(password, 10)).toString();

        const user = Users.create({
            email,
            password: hashPassword
        });

        res.json(user)
    }catch(error){
        res.status(500).json({message: "Internal server Error"})
    }
});


router.post('/api/signin', async (req, res)=>{
    try{
        const {email, password}= req.body

        const user = Users.findOne({
            where:{
                email
            }
        });

        if(!user){
            res.status(401).json({ error: "User not Found"})
        };
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            res.status(401).json({ error: "Invalid password"})
        }

        const token = jwt.sign({ userId: user.id}, "Logintoken ", {
            expiresIn: '1h'
        });

        res.json({ message: 'Login sucessfull'})
    }catch(error){
        res.status(500).json({ message: "Internal server error"})
    }
});


router.post('/api/changePassword', async (req, res)=>{
    try{
        const { email, currentPassword, newPassword}= req.body

        const user = Users.findOne({
            where: email
        })

        if(!user){
            res.status(401).json({ message: 'User not found'})
        }

        const checkPassword = await bcrypt.compareSync( currentPassword, user.password);

        if(!checkPassword){
            res.status().json({ error: "Current password invalid"})
        };

        const hashPass = (await bcrypt.hash(newPassword,10)).toString();

        await Users.update({
            password: hashPass
        },
        {
            where: {id: user.id}
        });

        res.json({ message: 'Password changed successfully'})

    }catch(error){
        res.status(500).json({ error: 'Server error'})
    }
});




module.exports = router;