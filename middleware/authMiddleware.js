const jwt=require('jsonwebtoken');
const authMiddleware=(req,res,next)=>{
  try{
    console.log("Middleware Running");

    const header=req.headers.authorization;
    console.log(header);

    const token=header.split(" ")[1];
    console.log(token);

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
     req.user=decoded;
  next();
  }catch(error){
    res.status(401).send({msg:"Invalid Token"});
  }
}



module.exports=authMiddleware;