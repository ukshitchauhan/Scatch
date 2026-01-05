const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            req.flash("error","Please Login First");
            res.redirect("/");
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }   
    catch{
        req.flash = ("error","Please Login First");
        return res.redirect('/');
    }
};