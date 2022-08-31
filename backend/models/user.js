const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//mongoose-unique-validator is a 3rd party package that allows validation whether the email or userid is unique or not.
const userSchema=mongoose.Schema({
  firstname: {type:String,required:true},
  lastname: {type:String,required:true},
  email: {type:String,required:true, unique:true},//NOTE: 'unique' doesn't do the job of validation. It just does optimization jobs inside mongoose. To add validation we need mongoose-unique-validator library added.
  password: {type:String,required:true},
})
userSchema.plugin(uniqueValidator); // This validates if the user tries to create a new user with same email address.
module.exports=mongoose.model("User",userSchema)
