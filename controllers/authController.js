const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
cookieParser();
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser =async (req,res)=>{
   try{
        let {fullname , email , password } = req.body;

        if(!fullname || !email || !password){
            req.flash("error","All Fields are Required");
            return res.redirect('/');
        }

        const checkUser =await userModel.findOne({email:email});
        if(checkUser){
            req.flash("error","Email Already Register");
            return res.redirect('/');
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await userModel.create({
            fullname,
            email,
            password:hashPassword,
        });

        let token = generateToken(user);
        res.cookie('token',token);
        req.flash("success", "Registration successful!");
        return res.redirect("/shop");
   }
   catch(err){
        req.flash("error", "Something Went Wrong");
        res.redirect("/");
   }
}

module.exports.loginUser = async (req,res)=>{
    try{
        let {email,password} = req.body;

        if(!email || !password){
            req.flash("error","All fields are required");
            res.redirect('/');
        }

        const user = await userModel.findOne({email});

        if(!user){
            req.flash("error","Invalid Email or Password");
            res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            req.flash("error","Invalid Email or Password");
            res.redirect('/');
        }

        const token = generateToken(user);
        res.cookie('token',token);
        return res.redirect('/shop');
    }
    catch(err){ 
        req.flash("error","Something Wrong");
        res.redirect('/');
    }
}

module.exports.logoutUser = async(req,res)=>{
    res.clearCookie("token");
    req.flash("error", "Logged out successfully");
    res.redirect("/");
}

