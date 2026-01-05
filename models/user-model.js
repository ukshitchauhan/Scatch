const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
    },

    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    cart:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
            },

            quantity:{
                type:Number,
                default:1,
            },
        },
    ],

    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"order",
        },
    ],

    contact:Number,
    picture:String,
},{timestamps:true});

module.exports = mongoose.model('user',userSchema);