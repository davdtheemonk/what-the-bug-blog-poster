const router = require('express').Router();
const axios = require('axios');
const { response } = require('express');
const BASE_URL = "https://wtb-v1.herokuapp.com"

router.route('/').get((req,res)=>{
    axios.get(BASE_URL+"/posts/")
    .then(posts => posts.data)
    .catch(err => res.status(400).json('Error:'+ err));

});
router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const date = Date.parse(req.body.date);
    const location =req.body.location;
    const image = req.body.image;
    const post = req.body.post;
    const timetoread = req.body.timetoread;

    const options = {
        method:'post',
        data:{
            title:title,
            date : date,
            location:location,
            image: image,
            post: post,
      
        }
    }
    axios(BASE_URL+"/posts/",options)
    .then(() => res.json('New Blog added'))
    .catch(err => res.status(400).json('Error:'+ err));


});
router.route("/:id").get((req,res)=>{
    axios.get(BASE_URL+"/posts/"+req.params.id)
    .then(post=>post.data)
    .catch(err => res.status(400).json('Error:'+ err))
})
router.route("/update/:id").get((req,res)=>{
    const title = req.body.title;
    const date = Date.parse(req.body.date);
    const location =req.body.location;
    const image = req.body.image;
    const post = req.body.post;
    const timetoread = req.body.timetoread;
    

    const options = {
        method:'post',
        data:{
            title:title,
            date : date,
            location:location,
            image: image,
            post: post,
            timetoread:timetoread,
            timetoread:timetoread,
        }
    }
    axios(BASE_URL+"/posts/"+req.params.id,options)
    .then(() => res.json('Blog updated'))
    .catch(err => res.status(400).json('Error:'+ err));


    
})

module.exports= router;