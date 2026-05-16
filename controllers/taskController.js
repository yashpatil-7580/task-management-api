const con=require('../db/db');


 const tasks=async(req,res)=>{
   
      const page=parseInt(req.query.page) || 1;
      const limit=parseInt(req.query.limit) || 5;
      const status=req.query.status;
      const offset=(page-1)*limit;
      const user_id=req.user.id;
      let result;
      let result1;
      console.log(page, limit , offset);
      try{
         if(status){
            result=await con.query("select * from task where status=$1 and user_id=$2 limit $3 offset $4",[status,user_id,limit,offset]);
            result1=await con.query("select count(*) from task where status=$1 and user_id=$2",[status,user_id]);
         }else{
            result=await con.query('select * from task where user_id=$1 limit $2 offset $3 ',[user_id,limit,offset]);
            result1=await con.query("select count(*) from task where user_id=$1 ",[user_id]);
         }
         let totalTasks=parseInt(result1.rows[0].count);
         let totalPages=Math.ceil(totalTasks/limit);
         res.send({success:true,
            page:page
            ,limit:limit,
            totalTasks:totalTasks,
            totalPages:totalPages,
            data:result.rows});
         
      }catch(e){
      console.log(e.message);
      res.status(500).send("Server Error")
      }
      console.log(user_id);
      
   };

const addtasks=async(req,res)=>{
    const{title,description}=req.body;
      const user_id=req.user.id;
    try{
     const result=await con.query("insert into task(title,description,user_id)values($1,$2,$3) returning *",[title,description,user_id])
     if(result.rowCount>0){
        res.send({msg:'Task Inserted'});
     }else{
        res.send({msg:"Insert Fail"})
     }
         
    }catch(e){
        console.log(e.message);
        res.status(500).send("Server Error")
    }
    console.log(user_id);
    
};

const updttask=async(req,res)=>{
    const id=parseInt(req.params.id);
    const{title,description,status}=req.body;
    const user_id=req.user.id;
    try{
       const result=await con.query("update task set title=$1,description=$2,status=$3,updated_at=CURRENT_TIMESTAMP where id=$4 and user_id=$5 returning *",[title,description,status,id,user_id]);
       if(result.rowCount>0){
        res.send({msg:"Task Updated",data:result.rows[0]})
       }else{
        res.status(404).send({msg:'Task not found'})
       }
    }catch(e){
       console.log(e.message);
       res.status(500).send({msg:'server error'});
       
    }
};

const deletetask=async(req,res)=>{
      const id=parseInt(req.params.id);
      const user_id=req.user.id;
      if (isNaN(id)) {
  return res.status(400).json({ msg: "Invalid ID" });
}
      try{
         const result=await con.query("delete from task where id=$1 and user_id=$2 returning *",[id,user_id]);
         if(result.rowCount>0){
            res.send({msg:"Task Deleted",data:result.rows[0]});
         }else{
            res.status(404).send({msg:"Task not Found"})
         }

      }catch(e){
         console.log(e.message);
         res.status(500).send({msg:"Server Error"});
      }
};

const filtertask=async(req,res)=>{ 
   const status=req.query.status;
   const user_id=req.user.id; 
   let result; 
   try{ 
      if(status){ 
         result=await con.query("Select * from task where status=$1 ",[status]);
       }else{
          result=await con.query("Select * from task where user_id=$1",[user_id]); 

       } 
       res.send({success:true ,data:result.rows}) 
      }catch(e){
          console.log(e.message);
           res.status(500).send({msg:"Server Error"})
      }
};

module.exports={tasks,addtasks,updttask,deletetask,filtertask};

