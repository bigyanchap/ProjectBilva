const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
  title:{type:String,required:true },
  content:{type:String, required:true},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
});
module.exports=mongoose.model('Post',postSchema);

/*** In the code snippet,
 * creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
 * here, ref property tells to which model, this Id will relate to,
 * in this case, it will refer to the model User. ***/
