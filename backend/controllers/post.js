const Post = require('../models/post');

exports.createPost=(req,res,next)=>{
  const post = new Post({
    title:req.body.title,
    content:req.body.content,
    creator:req.userData.userId
  });
  post.save().then(result =>{
    //When we do .then(result=>{}) after save(),
    //the "result" holds what's just created inside mongo.
    res.status(201).json({
      message:'Post Added Successfully.',
      id_:result._id, // post-back the id_
      creator: req.userData.userId
      //This userId we decoded from the token inside file check-auth.js
    });
  })
  .catch(error=>{
    res.status(500).json({
      message:"Post creation failed.",
      error:error
    })
  })
}

exports.updatePost=(req,res,next)=>{
  const post = new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content,
    creator:req.userData.userId
  });
  Post.updateOne({_id:req.params.id,creator:req.userData.userId},post)
  .then(result =>{
    console.log(result);
    if(result.matchedCount>0){
      res.status(200).json({message:"Post updated successfully."});
    }else{
      res.status(401).json({message:"401 Unauthorized user"});
    }
  })
  .catch(error=>{
    res.status(500).json({
      message:"Post Update Failed.",
      error:error
    })
  })
}

exports.getPosts=(req,res,next)=>{
  Post.find()
    .then(documents=>{
      res.status(200).json({'message':'succesful', 'posts':documents});
    }).catch(error=>{
      res.status(500).json({
        message:"Posts Fetch Failed.",
        error:error
      })
    });
}

exports.getById=(req,res,next)=>{
  Post.findById(req.params.id)
  .then(result=>{
    if(result){
      ResultantPost={id:result._id,title:result.title,content:result.content}
      res.status(200).json(ResultantPost);
    }
    else{
      res.status(404).json({'message':'Post not found.'});
    }
  }).catch(error=>{
    res.status(500).json({
      message:"Post Fetch Failed.",
      error:error
    })
  });
}
exports.delete=(req,res,next)=>{
  Post.deleteOne({_id:req.params.id,creator:req.userData.userId})
  .then(result=>{
    if(result.deletedCount>0){
      res.status(200).json({message:"Post deleted successfully."});
    }else{
      res.status(401).json({message:"401 Unauthorized user"})
    }
    console.log(result);
  })
  .catch(error=>{
    res.status(500).json({
      message:"Post Delete Failed.",
      error:error
    })
  })
}
