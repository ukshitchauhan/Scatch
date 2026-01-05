const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productsModel = require('../models/products-model');

router.get('/',(req,res)=>{
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index',{error,success});
});

router.get('/shop',isLoggedIn,async (req,res)=>{
    let error = req.flash('error');
    let success = req.flash('success');
    let products =await productsModel.find(); 
    res.render('shop',{products,error,success});
});

module.exports=router;