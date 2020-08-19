const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { populate } = require("../models/user");
const Post = mongoose.model("Post")

router.get('/allposts', requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")  // what info we want to get from the user data -- in this case only NAME
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, photo } = req.body
    if (!title || !body || !photo) {
        return res.status(422).json({ error: " please add all fields" })
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err);
        })
});


router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("PostedBy", "_id name")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => {
            console.log(err)
        })
})
// router.put('/like', requireLogin,(res,req)=>{
//     console.log(req.body.postId);
//     Post.findByIdAndUpdate(req.body.postId),{
//         $push:{likes:req.user._id}
//     }, {
//         new:true
//     }.exec((err,result)=>{
//         if(err) {
//             return res.status(422).json({error:err})
//         }else {
//             res.json(result)
//         }
//     })
// })
// router.put('/unlike', requireLogin,(res,req)=>{
//     Post.find(req.body.postId),{
//         $pull:{likes:req.user._id}
//     }, {
//         new:true
//     }.exec((err,result)=>{
//         if(err) {
//             return res.status(422).json({error:err})
//         }else {
//             res.json(result)
//         }
//     })
// })
router.put('/like', requireLogin, (req, res) =>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true

    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })

})
router.put('/unlike', requireLogin, (req, res) =>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true

    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })

})







module.exports = router