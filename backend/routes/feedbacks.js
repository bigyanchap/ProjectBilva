const express=require("express");
const Feedback = require('../models/feedback');
const router = express.Router();

router.post("",(req,res,next)=>{
  const feedback = new Feedback({
    title:req.body.title,
    content:req.body.content
  });
  feedback.save().then(result =>{
    //When we do .then(result=>{}) after save(),
    //the "result" holds what's just created inside mongo.
    res.status(201).json({
      message:'Feedback Added Successfully.',
      id_:result._id // post-back the id_
    });
  })
});
//only the path feedbacks (localhost:3000/api/feedbacks) will reach this middleware:
router.get('',(req,res,next)=>{
  Feedback.find()
    .then(documents=>{
      res.status(200).json({'message':'succesful', 'feedbacks':documents});
    });
});
router.delete('/:id',(req,res,next)=>{
  Feedback.deleteOne({_id:req.params.id})
  .then(result=>{
    console.log(result);
    res.status(200).json({message:"Feedback Deleted!"});
  })
});

module.exports=router;
