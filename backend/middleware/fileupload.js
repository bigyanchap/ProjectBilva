const multer = require("multer");

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,_callback)=>{
    /*Mime type validation in backend*/
    const isValid=MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type.");
    if (isValid){
      error = null;
    }
    _callback(error,"backend/images");
  },
  filename:(req,file,_callback)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    _callback(null,Date.now()+'-'+name);
  }
});

module.exports=multer({storage:storage}).single("image");
