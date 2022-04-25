const router = require('express').Router();
const axios = require('axios');
const FormData = require('form-data');
const { response } = require('express');
const BASE_URL = " "//url

router.route('/').get((req,res)=>{
    axios.get(BASE_URL+"/posts")
    .then(posts => res.json(posts.data))
    .catch(err => res.status(400).json('Error:'+ err));

});
router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const date = req.body.date;
    const location =req.body.location;
    const image = req.body.image;
    const post = req.body.post;
    const timetoread = req.body.timetoread;
    console.log(title,date,location,image,post,timetoread)
    const addBlog = async ()=>{

    
 


    const options = {
        method:'post',
        headers:{
            'Content-type':"application/json"
        },
        data:{
            "title": title,
        "date": "2022-04-13",
        "location": location,
        "timetoread": timetoread,
        "image": image,
        "post": post
            
        }
    }

    await axios(BASE_URL+"/posts/",options)
    .then(response => {
        console.log(response.data );
        return response.data 
    })
    .catch(err => res.status(400).json('Error:'+ err))
}
addBlog();



});
router.route("/:id").get((req,res)=>{
    axios.get(BASE_URL+"/posts/"+req.params.id)
    .then(post => res.json(post.data))
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
        }
    }
    axios(BASE_URL+"/posts/"+req.params.id,options)
    .then(() => res.json('Blog updated'))
    .catch(err => res.status(400).json('Error:'+ err));


    
})

module.exports= router;
