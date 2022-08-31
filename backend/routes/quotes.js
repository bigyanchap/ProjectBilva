const express= require("express");
const Quote = require('../models/quote');
const router = express.Router();
const checkAuth =require('../middleware/check-auth');
const extractFile =require('../middleware/fileupload');

/*** To add an image, just add multer middleware in between.
 * And to add authentication check, put that middleware even before
 * the image upload. ***/
router.post('',checkAuth,extractFile,(req,res,next)=>{
  const quote = new Quote({
    title:req.body.title,
    content:req.body.content,
    imagePath:req.file.filename
  });
  quote.save().then(result =>{
    //When we do .then(result=>{}) after save(),
    //the "result" holds what's just created inside mongo.
    res.status(201).json({
      message:'Quote Added Successfully.',
      quote:{id:result._id,...result}
    });
  })
});
router.put('/:id',checkAuth, extractFile,(req,res,next)=>{
  let imagePath = req.body.imagePath;
  let quote={};
  console.log('req.body.image',req.body.imagePath);
  if(req.file) //If it is a new file, replace the image name in database.
  {
    imagePath=req.file.filename;
    quote = new Quote({
      _id:req.body.id,
      title:req.body.title,
      content:req.body.content,
      imagePath:imagePath
    });
  }
  else//else if it is just an old link, don't modify image part.
  {
    quote = new Quote({
      _id:req.body.id,
      title:req.body.title,
      content:req.body.content
    });
  }

  Quote.updateOne({_id:req.params.id},quote)
  .then(result =>{
    console.log('result',result);
    res.status(200).json({
      message:'Quote Updated Successfully.',
    });
  })
});
//only the path quotes (localhost:3000/api/quotes) will reach this middleware:
router.get('',(req,res,next)=>{

  const url = req.protocol + '://' +req.get("host");
  const url_=url+"/images/";

  const pageSize = +req.query.pagesize; //+ before string converts the string to number
  const currentPage = +req.query.page;
  const quoteQuery=Quote.find();
  let fetchedQuotes;
  if(pageSize&&currentPage){
    quoteQuery.skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }
  quoteQuery.then(documents=>{
    fetchedQuotes=documents;
      return Quote.count();
    })
    .then(count=>{
      res.status(200)
      .json(
        {
        'message':'succesful',
        'maxQuotes':count,
        'quotes':fetchedQuotes.map(doc=>
          ({
            id: doc._id,
            title:doc.title,
            content:doc.content,
            imagePath:url_+doc.imagePath
          }))
        });
    });
});

router.get('/eu',(req,res,next)=>{ //eu=enduser
  const currentBlock= +req.query.currentBlock;
  const itemsPerLazyLoad = +req.query.itemsPerLazyLoad; //+ before string converts the string to number
  console.log('req.query',req.query);
  const url = req.protocol + '://' +req.get("host");
  const url_=url+"/images/";

  const quoteQuery=Quote.find();
  let fetchedQuotes;
  if(itemsPerLazyLoad&&currentBlock){
    quoteQuery.skip(itemsPerLazyLoad*(currentBlock-1))
    .limit(itemsPerLazyLoad);
  }
  quoteQuery.then(documents=>{
    fetchedQuotes=documents;
      return Quote.count();
    })
    .then(count=>{
      res.status(200)
      .json(
        {
        'message':'succesful',
        'maxQuotes':count,
        'quotes':fetchedQuotes.map(doc=>
          ({
            id: doc._id,
            title:doc.title,
            content:doc.content,
            imagePath:url_+doc.imagePath
          }))
        });
    });
});

/***We added checkAuth to this GET because
 *  it is only for super-user, not for the end user.***/
router.get('/:id',checkAuth,(req,res,next)=>{
  Quote.findById(req.params.id)
  .then(result=>{
    if(result){
    const url = req.protocol + '://' +req.get("host");
    const url_=url+"/images/";

      ResultantQuote={
        id:result._id,
        title:result.title,
        content:result.content,
        image:url_+result.imagePath
      }
      res.status(200).json(ResultantQuote);
    }
    else{
      res.status(404).json({'message':'quote not found!'});
    }
  });
});

router.delete('/:id',checkAuth,(req,res,next)=>{
  Quote.deleteOne({_id:req.params.id})
  .then(result=>{
    console.log(result);
    res.status(200).json({message:"Quote Deleted!"});
  })
});

module.exports=router;
