const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];// we are taking only the string after bearer word from the [bearer t0k3n!!!_Vaguely_long_string]
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.userData ={email:decodedToken.email,userId:decodedToken.userId}
    next();
  }catch(error){
    res.status(401).json({message:"Not Authenticated."});
  }
};
/***One good thing about express.js is we can append
 * as many new parameters to the req.
 * Just make sure you don't use the old params.
 * For example, don't use req.body
 * Otherwise, the old value req.body will get replaced.
 * Therefore, here, we added req.userData
 * which can be accessed from the API's (req,res,next)=> etc. . ***/
