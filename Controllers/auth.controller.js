const {Users }= require('../Models/Users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
      const { password, email, name, phonenumber, shopcode, till, organization, role } = req.body;
  
      const existingUser = await Users.findOne({
        where: {
          email,
        },
      });
  
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      const hashPassword = (await bcrypt.hash(password, 10)).toString();
  
      const user = await Users.create({
        email,
        password: hashPassword,
        name, phonenumber, shopcode, till, organization, role
      });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server Error' });
    }
  };



  exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({
        where: {
          email,
        },
      });
  
      if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid password or username, please recheck or click Forgot password" });
      }
  
      const validPassword = bcrypt.compareSync(password, user.password);
  
      if (!validPassword) {
        return res
          .status(401)
          .json({ error: "Invalid password, please recheck or click Forgot password" });
      }
  
      const token = jwt.sign({ userId: user.id }, "Logintoken ", {
        expiresIn: "1h",
      });
  
      res.json({ token, message: "Login success", user: user.email, name: user.name, phone: user.phonenumber, image: user.image, url: user.imageUrl });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  


exports.changePassword = async (req, res)=>{
    try{
        const { email, currentPassword, newPassword}= req.body

        const user = await Users.findOne({
            where:  { email: email },
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
        res.status(500).json(error)
    }
};


exports.getUsers = async (req, res)=>{
  try{
    const allUser = await Users.findAll()
    res.json(allUser);

  }catch(error){
    res.status(500).json(error)
  }
}
