const jwt = require('jsonwebtoken');
require('dotenv').config();

const ownerGenerateToken = (owner)=>{
    return jwt.sign({email:owner.email,id:owner._id},process.env.JWT_SECRET);
}

module.exports.ownerGenerateToken =ownerGenerateToken; 