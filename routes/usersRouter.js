const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const userModel = require('../models/user-model');
const productModel = require('../models/products-model');

cookieParser();
let {
    registerUser,
    loginUser,
    logoutUser,
} = require('../controllers/authController');

const isLoggedIn = require('../middlewares/isLoggedIn');
const orderModel = require('../models/order-model');
const { calculateOrder } = require('../services/calculateOrder');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);

router.get('/cart', isLoggedIn, async (req, res) => {
    try{
        let error = req.flash('error');
        let success = req.flash('success');
        let user = await userModel.findById(req.user.id).populate('cart.product')
        res.render('cart', {user,success,error});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/');
    }
    
});

router.get('/cart/:id',isLoggedIn,async(req,res)=>{
    try{
        let user = await userModel.findById(req.user.id);
        let productId = req.params.id;
        
        const itemIndex = user.cart.findIndex(
            item => item.product.toString() === productId
        );

        if(itemIndex > -1){
            user.cart[itemIndex].quantity+=1;
        }else{
            user.cart.push({
                product:productId,
                quantity:1
            });
        }

        await user.save();
        req.flash('success','Item added...');
        res.redirect('/shop');
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/shop');
    }
});

router.get('/cart/remove/:id',isLoggedIn,async(req,res)=>{
    try{
        const user = await userModel.findById(req.user.id);
        const productId = req.params.id;

        const itemIndex = user.cart.findIndex(
            item => item.product.toString() === productId
        );

        if(itemIndex > -1){
            if(user.cart[itemIndex].quantity > 1){
                user.cart[itemIndex].quantity -= 1;
            }else{
                user.cart.splice(itemIndex,1);
            }
        }

        await user.save();
        req.flash('success','Item Removed...');
        res.redirect('/users/cart');
    }
    catch(err){ 
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/cart');
    }
});

router.get('/profile',isLoggedIn,async(req,res)=>{
    try{
        let user = await userModel.findById(req.user.id)
        .populate(
            {
                path:'orders',
                populate:{
                    path:'products.product',
                }
            }
        );
        res.render('profile',{user});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/');
    }
});

router.get('/settings',isLoggedIn,async(req,res)=>{
    try{
        let error = req.flash('error');
        let success = req.flash('success');
        let user = await userModel.findById(req.user.id);
        res.render('settings',{user,error,success});
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/');
    }
});

router.post('/update-picture',isLoggedIn,async(req,res)=>{  
    try{
       let user = await userModel.findById(req.user.id);
        let {image} = req.body;
        user.picture = image;
        await user.save();
        req.flash('success','Image inserted...');
        res.redirect('/users/settings');
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/settings');
    }
});

router.post('/update-profile',isLoggedIn,async(req,res)=>{
    try{
        let user = await userModel.findById(req.user.id);
        let {fullname,contact} = req.body;
        await userModel.findByIdAndUpdate(user._id,{fullname,contact});
        req.flash('success','Profile Updated...');
        res.redirect('/users/profile');
    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/users/profile');
    }
});

router.get('/checkout',isLoggedIn,async(req,res)=>{
    try{
        let user = await userModel.findById(req.user.id).populate('cart.product');
        let cart = user.cart;
        res.render('checkout',{user,cart});
    }
    catch(err){
        res.redirect('/shop');
    }
});

router.get('/orders',isLoggedIn,async(req,res)=>{
    try{
        let user = await userModel.findById(req.user.id)
        .populate(
            {
                path:'orders',
                populate:{
                    path:'products.product',
                }
            }
        );
        res.render('user_orders',{user});
    }
    catch(err){
        req.flash('error','Something Went Wrong');
        res.redirect('/shop');
    }
});

router.post('/order/place',isLoggedIn,async(req,res)=>{
   try{
    let user = await userModel.findById(req.user.id).populate('cart.product');
    let { address , zip , city } = req.body;
    let Address = `${address} , ${city} , ${zip}`;

    const {  products , total } = calculateOrder(user.cart);

    // console.log(user._id,products,total,Address);
    const order = await orderModel.create({
        user:user._id,
        products,
        totalAmount:total,
        address:Address,
    });

    user.cart=[];
    user.orders.push(order._id);
    await user.save();

    req.flash('success','Order placed');
    res.redirect('/shop');

   }    
   catch(err){
    req.flash('error','Something Went Wrong with Order');
    res.redirect('/shop');
   }
});

module.exports=router;