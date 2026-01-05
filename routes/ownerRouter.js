const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/products-model');
const orderModel = require('../models/order-model');
const isOwnerLoggedIn = require('../middlewares/isOwnerLoggedIn');
const flash = require('connect-flash');

let {
    loginOwner,
    logoutOwner,
} = require('../controllers/ownerAuthController');



router.get('/logout',logoutOwner);

router.post('/login',loginOwner);

router.get('/',(req,res)=>{
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('admin_login',({success,error}));
}); 

router.get('/dashboard',isOwnerLoggedIn,async(req,res)=>{
    try{
        let products = await productModel.find();
        let orders = await orderModel.find();
        res.render('admin_dashboard',{products,orders});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/owners/dashboard');
    }
});

router.get('/products',isOwnerLoggedIn,async(req,res)=>{
    try{
        let products = await productModel.find();
        let success = req.flash('success');
        let error = req.flash('error');
        res.render('products',{products,success,error});
    }
    catch(err){
         req.flash('error','Something Went Wrong...');
        res.redirect('/owners/products');
    }
});

router.get('/createproducts',isOwnerLoggedIn,(req,res)=>{
        let success = req.flash('success');
        let error = req.flash('error');
        res.render('createproducts',({success,error}));
});

router.get('/orders',isOwnerLoggedIn,async(req,res)=>{
    try{
        let orders = await orderModel.find().populate('user').populate('products.product').sort({ updatedAt: -1 });
        let success = req.flash('success');
        let error = req.flash('error');
        res.render('admin_order',{orders,error,success});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/owners/admin_order');   
    }
});

router.post('/orders/update-status/:id',isOwnerLoggedIn,async(req,res)=>{
    try{
        let status = req.body.status;
        await orderModel.findByIdAndUpdate(req.params.id,{status});
        req.flash('success','Status Update...');
        res.redirect('/owners/orders');
    }
    catch(err){
        req.flash('error','Status Not Update...');
        res.redirect('/owners/orders');
    }  
});

router.get('/orders/:id',isOwnerLoggedIn,async(req,res)=>{
    try{
        let order = await orderModel.findById(req.params.id).populate('user').populate('products.product');
        res.render('order_details',{order});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/owners/orders');
    }
})

module.exports = router;