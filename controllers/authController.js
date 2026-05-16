const con=require('../db/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const signup=async(req,res)=>{
  const {email,password}=req.body;
  const existingUser=await con.query("select * from users where email=$1",[email]);
  if((await existingUser).rows.length>0){
    res.status(400).send({msg:"User Already Exist"});
    return;
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const newUser=await con.query("insert into users(email,password)values($1,$2) returning * ",[email,hashedPassword]);
  const token=jwt.sign({id:newUser.rows[0].id},process.env.JWT_SECRET);

  res.send({
    success:true,
    msg:"User Registered Sucessfully",
    token:token
  })
}


const login=async(req,res)=>{
  const {email,password}=req.body;
  const existingUser=await con.query("select * from users where email=$1",[email]);
  if(existingUser.rows.length===0){
    res.status(400).send("User Doesn't Exist");
    return;
  }
  const isMatch=await bcrypt.compare(password,existingUser.rows[0].password);
  if(!isMatch){
    res.status().send("Invalid Credential");
    return;
  } 
 const token =jwt.sign({id:existingUser.rows[0].id},process.env.JWT_SECRET);
 res.send({
  success:true,
  toekn:token
 }
 )
}


module.exports={signup,login};