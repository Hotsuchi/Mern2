require('dotenv').config();
const mongoose = require('mongoose');

// mongodb connection
mongoose.connect(process.env.DB_URI)
.then(()=>console.log('Database connection sucsessful...'))
.catch((err)=>console.log('Database conection fiald',err));

// mongoose Schema
const userSchema = new mongoose.Schema({
    uname:String,
    pass:Number
});

// mongoose model
const User = mongoose.model('User',userSchema);


module.exports = { User };