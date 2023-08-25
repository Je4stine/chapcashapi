const express = require('express');
const router = express.Router();

const { Messages} = require('../Models/Messages');


exports.allMessages =async (req, res)=>{
    try{
        const messages = await Messages.findAll();
        res.json(messages)
    }catch(error){
        res.status(500).json({message: "Internal Server error"})
    }
};

exports.complete = async(req, res)=>{
        try{
            const completed = await Messages.findAll({
                where: {
                    Msgstatus: true
                }
            })

            res.json(completed);
        }catch(error){
            res.status(500).json({message: 'Error geting completed Messages'})
        }
};


exports.pending = async (req, res)=>{
    try{
        const pending = await Messages.findAll({
            where:{
                Msgstatus: false
            }
        });
        res.json(pending);
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error getting pending Messages'})
    }
};

exports.add = async (req, res)=>{
    try{
        const {TransID, TransTime, MSISDN, TransAmount, FirstName,BillRefNumber, Msgstatus}=req.body
        const add = await Messages.create({
            TransID, TransTime, MSISDN, TransAmount, FirstName,BillRefNumber, Msgstatus,
        });

        res.status(200).json(add)

    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error adding messages'})
    }
}


exports.confirm = async(req, res)=>{
    const {id, user} = req.body
    try{
        const update = await Messages.findOne({ where: { id: id}});
        await update.update({Msgstatus: true});
        await update.update({ConfirmedBy: user});

        res.status(200).json({message: 'Payment Confirmed'})
    }catch(error){
        res.status(500).json({message: 'Error confirming messages'})
    }
};

