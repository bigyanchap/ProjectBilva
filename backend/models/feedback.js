const mongoose = require('mongoose');

const feedbackSchema=mongoose.Schema({
  title:{type:String,required:true },
  content:{type:String, required:true}
});

module.exports=mongoose.model('Feedback',feedbackSchema);
