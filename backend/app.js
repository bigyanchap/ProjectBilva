const path = require('path');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');

const userRoutes=require('./routes/user');
const postsRoutes =require('./routes/posts');
const feedbacksRoutes =require('./routes/feedbacks');
const quotesRoutes =require('./routes/quotes');

const app=express();
mongoose.connect(
  "mongodb+srv://"+process.env.MONGO_ATLAS_username+":"
  +process.env.MONGO_ATLAS_password
  +"@cluster0.tivk2.mongodb.net/node-angular"
)
.then(()=>{
  console.log('Connected to DB!');
})
.catch(()=>{
  console.log('Connection failed.');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join('backend/images')));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next(); //use next so that next app.post() will be activated.
});

/*-----ROUTES------*/
app.use("/api/user",userRoutes);
app.use("/api/posts",postsRoutes);
app.use("/api/feedbacks",feedbacksRoutes);
app.use("/api/quotes",quotesRoutes);

module.exports = app;
