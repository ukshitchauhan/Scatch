const express = require('express');
const router = express.Router();
const productModel = require('../models/products-model');
const flash = require('connect-flash');
const isOwnerLoggedIn = require('../middlewares/isOwnerLoggedIn');

router.post('/create',async (req,res)=>{
    try{
        let {
            image,
            name,
            category,
            price,
            discount,
            stock,
            description,
        } = req.body;

        if(!name || !price || !discount || !image || !category || !stock ){
            req.flash('error','All fields are requires');
            return res.redirect('/owners/createproducts');
        }

        let product =await productModel.create({
            image,
            name,
            price,
            discount,
            category,
            stock,
            description,
        });

        req.flash('success','Product Inserted');
        res.redirect('/owners/createproducts');

    }
    catch(err){
        req.flash('error','Something Went Wrong...');
        res.redirect('/owners/createproducts');
    }
});

router.get('/edit/:id',isOwnerLoggedIn,async(req,res)=>{
    try{
        let product = await productModel.findById(req.params.id);
        res.render('edit_product',({product}));
    }
    catch(err){
        res.render('/owners/products');
    }
})

router.post('/update/:id',isOwnerLoggedIn,async(req,res)=>{
    try{
        let {name,description,price,discount,category,stock,image} = req.body;
        await productModel
            .findByIdAndUpdate(
                req.params.id,
                {name,description,price,discount,category,stock,image}
            );
       
        req.flash('success','Product Edited');
        res.redirect('/owners/products');
    }
    catch(err){
        req.flash('error','Something Went Wrong');
        res.redirect('/owners/products');
    }
});

router.get('/delete/:id',isOwnerLoggedIn,async(req,res)=>{
    try{
        let product = await productModel.findById(req.params.id);
        
        if(product.isActive == true){
        product.isActive=false;
        await product.save();
        req.flash('success','Product Deactive');
        res.redirect('/owners/products');
        }else{
        product.isActive=true;
        await product.save();
        req.flash('success','Product Active');
        res.redirect('/owners/products');
        }
    }
    catch(err){
        req.flash('error','Something Went Wrong');
        res.redirect('/owners/products');
    }
});

module.exports = router;