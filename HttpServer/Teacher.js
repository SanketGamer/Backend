//1. let say how many student study that teacher
//2. how many are good student and how many are bad student
//3. all the bad student make them good student
//4. remove the bad student.

const express=require("express");
const app=express();

const Teacher=[{
  name:"Ashis",
  StudentCount:[{
  GoodStudent:false,
  }]
}]

app.use(express.json());

app.get("/",function(req,res){
  const AshisStudent=Teacher[0].StudentCount
  const NumOfStudent=AshisStudent.length;
  let NumOfGoodStudent=0;
  for(let i=0;i<NumOfStudent;i++){
    if(AshisStudent[i].GoodStudent){
      NumOfGoodStudent+=1;
    }
  }
  let NumOfBadStudnet=NumOfStudent-NumOfGoodStudent
  res.json({
  NumOfStudent,
    NumOfGoodStudent,
     NumOfBadStudnet
  })
})

app.post("/",function(req,res){
  const isGoodStudent=req.body.isGoodStudent;
  Teacher[0].StudentCount.push({
    GoodStudent:isGoodStudent
  })
  res.json({
    msg:"Done"
  })
})

app.put("/",function(req,res){
  for(let i=0;i<Teacher[0].StudentCount.length;i++){
    Teacher[0].StudentCount[i].GoodStudent=true;
  }
  res.json({msg:"updated"})
})

app.delete("/",function(req,res){
  if(isthereHaveStudent()){
  let AllgoodStudent=[]
  for(let i=0;i<Teacher[0].StudentCount.length;i++){
  if(Teacher[0].StudentCount[i].GoodStudent){
  AllgoodStudent.push({
    GoodStudent:true
  })
  }
  }
  Teacher[0].StudentCount=AllgoodStudent;
  res.json({
    msg:"Done U have only good student"
  })
}
  else{
    res.status(411).json({
        msg:"U have no Student"
    })
  }
})

//edge cases
function isthereHaveStudent(){
  let atleastoneStudent=false;
  for(let i=0;i<Teacher[0].StudentCount.length;i++){
    if(!Teacher[0].StudentCount[i].GoodStudent){
    atleastoneStudent=true
    }
  }
    return atleastoneStudent;
}
app.listen(3000);
