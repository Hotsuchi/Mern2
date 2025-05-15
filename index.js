require('dotenv').config();
const express = require('express');
const app = express();
const { User } = require('./dbmodel.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Backend Home page</h1>');
})

app.post('/read',async (req,res)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send('data sucsessfuly save');
    }catch(err){
        res.status(404).send('data not save');
    }
    
})

app.get('/read',async (req,res)=>{
    const dta = await User.find();
    res.json(dta);
})

app.delete('/delete/:id',async (req,res)=>{
    let delDta= await req.params.id;
    User.deleteOne({_id:delDta})
    .then(()=>res.send('delete sucsess'))
    .catch((err)=>res.send('not delete'));
})

app.get('/txdta/:id',async (req,res)=>{
    let fDta =await User.findOne({_id:req.params.id})
    res.status(200).send(fDta);
})

app.put('/update/:id',async (req,res)=>{
    let upDta = await User.updateOne({_id:req.params.id},{$set:req.body});
    res.status(201).send(upDta);
})


app.listen(process.env.PORT,()=>console.log('Port sucsessfuly run :',process.env.PORT))