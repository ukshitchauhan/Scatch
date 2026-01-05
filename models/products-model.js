const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    description :String,

    price:{
        type:Number,
        required:true,
    },

    discount :{
        type:Number,
        default:0,
        min:0,
        max:90,
    },

    finalPrice:Number,

    category:String,

    stock:{
        type:Number,
        default:1,
    },

    isActive:{
        type:Boolean,
        default:true,
    },      

    image:String,
},{timestamps:true});

module.exports = mongoose.model("product",productSchema);

