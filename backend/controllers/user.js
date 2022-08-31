const bcrypt = require("bcrypt");//bcrypt is a 3rd party package that hashes the password.
const jwt = require("jsonwebtoken")
const User=require("../models/user");

exports.createUser = (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const user=new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      password:hash
    });
    user.save()
    .then(result=>{
      res.status(201).json({
        'success':true,
        'message':"User Created Successfully.",
        'result':{email:result.email}
      });
    })
    .catch(err=>{
      res.status(500)
      .json({
        'success':false,
        'error':err,
        'message':'Email already taken.'
      });
    });
  });
}

exports.userLogin=(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email})
  .then(user=>{
    fetchedUser=user;
    if(!user) // if user is not found (undefined)
    {
      return res.status(401) //401 is authentication denied
        .json({
        'success':false,
        'message':'Invalid Email or Password.'
      })
    }
    return bcrypt.compare(req.body.password,user.password);
  })
  .then(result=>{// result will be of type boolean
    if(!result)
    {
      return res.status(401).json({
        'success':false,
        'message':'Invalid Email or Password.'
      })
    }

    //So after checking validity of email and password, we now can create jwt.
    const token = jwt.sign( //sign method creates new token based on some input data of your choice.
      {email:fetchedUser.email,
        userId:fetchedUser._id,
        firstname:fetchedUser.firstname
      },
      process.env.JWT_KEY,
      {expiresIn:"1h"}
    );
    //this is the last step, so no need of "return" keyword.
    res.status(200).json({
      token:token,
      expiresIn:3600,
      userId:fetchedUser._id
    })
  })
  .catch(err=>{
    res.status(401).json({
      success:false,
      message:'Invalid Email or Password.',
      error:err
    })
  })
}
