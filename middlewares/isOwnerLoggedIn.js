const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
        const ownerToken = req.cookies.ownerToken;

        if(!ownerToken){
            req.flash("error","Please Login First");
            res.redirect("/owners");
        }

        const decoded = jwt.verify(ownerToken,process.env.JWT_SECRET);
        req.owner = decoded;
        next();
    }   
    catch{
        req.flash = ("error","Please Login First");
        return res.redirect('/owners');
    }
};