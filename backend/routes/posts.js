const express= require("express");
const PostController=require("../controllers/post");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post('',checkAuth, PostController.createPost);
router.get('',PostController.getPosts);
router.put('/:id',checkAuth,PostController.updatePost);
router.get('/:id',PostController.getById);
router.delete('/:id',checkAuth,PostController.delete);

module.exports=router;
