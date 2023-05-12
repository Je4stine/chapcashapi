const express = require('express');
const router = express.Router();

const { Messages} = require('../Models/Messages');


router.get('/api/allMessages', async (req, res)=>{
    try{
        const messages = await Messages.findAll();
        res.json(messages)
    }catch(error){
        res.status(500).json({message: "Internal Server error"})
    }
});

router.get('/api/complete', async(req, res)=>{
        try{
            const completed = Messages.findAll({
                where: {
                    Msgstatus: true
                }
            })

            res.json(completed);
        }catch(error){
            res.status(500).json({message: 'Error geting completed Messages'})
        }
});


router.get('/api/pending', async (req, res)=>{
    try{
        const pending = await Messages.findAll({
            where:{
                Msgstatus: false
            }
        });
        res.json(pending);
    }catch(error){
        res.status(500).json({ message: 'Error getting pending Messages'})
    }
});


