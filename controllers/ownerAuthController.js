const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
cookieParser();
const {ownerGenerateToken} = require('../utils/ownerGenerateToken');

// module.exports.registerOwner =async (req,res)=>{
//    try{
//        fullname = "Vyom Chauhan";
//        email="vyom@gmail.com";
//        password="123456";

//         const checkUser =await ownerModel.findOne({email:email});
//         if(checkUser){
//             req.flash("error","Email Already Register");
//             return res.redirect('/owners');
//         }

//         const hashPassword = await bcrypt.hash(password,10);

//         const owner = await ownerModel.create({
//             fullname,
//             email,
//             password:hashPassword,
//         });

//         req.flash("error", "registered");
//         return res.redirect("/owners");
//    }
//    catch(err){
//         req.flash("error", "Something Went Wrong");
//         res.redirect("/");
//    }
// }

module.exports.loginOwner = async (req,res)=>{
    try{
        let {email,password} = req.body;

        if(!email || !password){
            req.flash("error","All fields are required");
            res.redirect('/owners');
        }

        const owner = await ownerModel.findOne({email});

        if(!owner){
            req.flash("error","Invalid Email or Password");
            res.redirect('/owners');
        }

        const isMatch = await bcrypt.compare(password,owner.password);
        if(!isMatch){
            req.flash("error","Invalid Email or Password");
            res.redirect('/owners');
        }

        const ownerToken = ownerGenerateToken(owner);
         res.cookie('ownerToken',ownerToken);
        return res.redirect('/owners/dashboard');
    }
    catch(err){ 
        req.flash("error","Something Wrong");
        res.redirect('/owners');
    }
}

module.exports.logoutOwner = async(req,res)=>{
    res.clearCookie("ownerToken");
    req.flash("error", "Logged out successfully");
    res.redirect("/owners");
}
