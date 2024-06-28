const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    Course: {
        type:String,
        required:false
    },
    Grade: {
        type:String,
        required:true
    },
    Credits: {
        type:Number,
        required:true,
    }
})

const Userdb = mongoose.model('userdb', schema)

module.exports = Userdb