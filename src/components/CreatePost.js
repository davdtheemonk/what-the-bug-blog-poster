import React,{useState,useRef} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from '@mui/material/TextField';
import DatePicker from "react-date-picker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import JoditEditor from "jodit-react"
import axios from "axios"
import { LoadingButton } from '@mui/lab';


import{Link} from "react-router-dom"
import "./styles.css"



export default function CreatePost() {
  const BASE_URL = "https://wtb-v1.herokuapp.com"
    const [blogtitle,setTitle] = useState("");
    const [bloglocation,setLocation] = useState("")
    const [blogdate,setDate] = useState(new Date())
    const [blogpost,setPost] = useState("")
    const [blogtimetoread,setTimetToRead]  = useState("")
    const [blogimage,setImage]  = useState("")
    const [blogs,setBlogs] = useState([]);
    const [notification,setNotification] = useState("")
    const [loading,setLoading]=useState(false)
    const editor = useRef(null)

      
       
       async function handleSubmit (e){
        e.preventDefault();
        setLoading(true)

 

    const title = JSON.stringify(blogtitle)
    const date = JSON.stringify(blogdate)
    const location = JSON.stringify(bloglocation)
    const image= JSON.stringify(blogimage)
    const timetoread = JSON.stringify(blogtimetoread)
    const post = JSON.stringify(blogpost)
    console.log(date.substring(1,11))


    const options = {
      method:'post',
      headers:{
          'Content-type':"application/json"
      },
      data:{
        "title" :title,
            "date" : date.substring(1,11),
             "location" :location,
            "timetoread": timetoread,
            "image" : image,
            "post" : post
          
      }
  }

  await axios(BASE_URL+"/posts/",options)
  .then(res=>{
    setTimeout(() => {
       setNotification("Blog Submitted successfully");
       setLoading(false);
     
 }, 5);
 setNotification("")

})
.catch(err=>{


  setTimeout(() => {
          setNotification("An "+err+" occurred");
          setLoading(false);
     
 }, 5);
 setNotification("")

})
}

        
        

        
    
        
        return(
            <div>
               

     {notification!==""&&
            <div class="alert alert-danger" role="alert">
   <p>{notification}</p>
</div>
}
 { loading && <div className="loader"><img src="load.gif"/> </div>}
       
<form onSubmit={handleSubmit}>

  <div className="mb-2">
    
    <label className="form-label">Title of the Blog</label>
    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={blogtitle} className="form-control" id="title" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-2">
    <label  className="form-label">Location</label>
    <input type="text"onChange={(e)=>setLocation(e.target.value)} value={bloglocation}  className="form-control" id="location" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-2">
    <label  className="form-label">Image id from Unsplash</label>
    <input type="text" onChange={(e)=>setImage(e.target.value)} value={blogimage}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-2">
    <label className="form-label">Time to read</label>
    <input type="text" onChange={(e)=>setTimetToRead(e.target.value)} value={blogtimetoread} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
    </div>
  
    <div className="mb-2">
    <label className="form-label">Date posted</label>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
    <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={blogdate}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
        </LocalizationProvider>
        </div>
        <div className="mb-2">
        <label className="form-label">Your post goes Here</label>
        <JoditEditor ref={editor} onChange={(content)=>setPost(content)}/>
        </div>
    
  <LoadingButton variant="contained"loading={loading} onClick={handleSubmit}>Post Blog</LoadingButton>
</form>
            </div>

        )
    }

