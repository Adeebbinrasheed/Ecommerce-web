const jwt=require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated=async(req,res,next)=>{
   let token;
   token=req.cookies.token

   if(!token){
    res.status(400).json({message:'please login'})
   }

   const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)

   req.user=await User.findById(decoded.id)
   console.log(req.user);
   if (!req.user) {
    return res.status(401).json({ message: 'User not found, please login again' });
}
   next()
   }

   module.exports=isAuthenticated
