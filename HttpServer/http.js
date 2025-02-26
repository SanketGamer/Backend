//Real life Hospital example http server using express
//using: (get,post,put,delete)

//Task-> 
//1.i need do a logic that informed me how many kidneys he have,and how many are unhealthy.
//2.lets U can add new unhealthy kidney
//3.Lets say all kidneys make them healthy 
//4.let say we are remove unhealthy kidneys
const express=require("express");
const app=express();
app.use(express.json())
const user=[{
  name:"sanket",
  kidney:[{
    healthy:false
  }]
}]
app.get("/",function(req,res){
  let sanketkidney=user[0].kidney;
  let noOfkidney=sanketkidney.length;
  let numOfhealthykidney=0;
  for(let i=0;i<noOfkidney;i++){
    if(sanketkidney[i].healthy){
     numOfhealthykidney+=1;
    }
  }
  const numunHealthykidney=noOfkidney-numOfhealthykidney;
   return res.json({
      noOfkidney,
     numOfhealthykidney,
     numunHealthykidney
    })
})
app.post("/",function(req,res){
  const isHealthy=req.body.isHealthy;
  user[0].kidney.push({
    healthy:isHealthy
  })
  res.json({
    msg:"Done"
  })
})
app.put("/",function(req,res){
  for(let i=0;i<user[0].kidney.length;i++){
    user[0].kidney[i].healthy=true
  }
  res.json({
    msg:"Updated"
  })
})
app.delete("/",function(req,res){
  if(isthereanykidneys()){
  const onlyhealthykidney=[]
  for(let i=0;i<user[0].kidney.length;i++){
    if(user[0].kidney[i].healthy){
      onlyhealthykidney.push({
        healthy:true
      })
    }
  }
  user[0].kidney=onlyhealthykidney
  res.json({
    msg:"Work Done"
  })
  }else{
    res.status(403).json({
      msg:"U have no kidneys"
    })
  }
})
//edge case: there is no kidneys
function isthereanykidneys(){
  let atleastonekidneys=false
  for(let i=0;i<user[0].kidney.length;i++){
    if(!user[0].kidney[i].healthy){
      atleastonekidneys=true;
    }
  }
    return atleastonekidneys
}
app.listen(3000)
