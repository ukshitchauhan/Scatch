const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
            },
            quantity:Number,
        },
    ],

    totalAmount:Number,

    address:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        enum:["Pending","Shipped","Delivered"],
        default:"Pending",
    },

}, {timestamps:true});

module.exports = mongoose.model("order",orderSchema);