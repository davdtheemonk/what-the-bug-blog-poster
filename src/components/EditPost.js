import React,{useState,useRef,useEffect} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from '@mui/material/TextField';
import DatePicker from "react-date-picker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import JoditEditor from "jodit-react"
import { LoadingButton } from '@mui/lab';
import axios from "axios"

import{Link,useParams} from "react-router-dom"



export default function EditPost() {
  const {id} = useParams();
  const BASE_URL = "https://wtb-v1.herokuapp.com/posts/"

    const [blogtitle,setTitle] = useState("");
    const [bloglocation,setLocation] = useState("")
    const [blogdate,setDate] = useState(new Date())
    const [blogpost,setPost] = useState("")
    const [blogtimetoread,setTimeToRead]  = useState("")
    const [blogimage,setImage]  = useState("")
    const [blogs,setBlogs] = useState([]);
    const [loading,setLoading]=useState(false)
    const [notification,setNotification] = useState("")
 
    const editor = useRef(null)
  
  
    axios.get(`http://localhost:5000/posts/${id}`)
    .then(response=>{
       setTitle(response.data.title);
       setLocation(response.data.location);
       setDate(new Date(response.data.date));
       setPost(response.data.post);
       setTimeToRead(response.data.timetoread);
       setImage(response.data.image);

      
      

    })
    .catch((error) => {
      setNotification("An "+error+" occurred");
      console.log(error)
    })
 
      async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const title = JSON.stringify(blogtitle)
        const date = JSON.stringify(blogdate)
        const location = JSON.stringify(bloglocation)
        const image= JSON.stringify(blogimage)
        const timetoread = JSON.stringify(blogtimetoread)
        const post = JSON.stringify(blogpost)
        console.log(date.substring(1,11))
    
    
        const options = {
          method:'put',
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
    
        await  axios(`https://wtb-v1.herokuapp.com/posts/${id}`,options)
        .then(res=>{setNotification("Blog Updated Succesful ")
        setLoading(false);
      })
        
        .catch((err)=>
        setNotification("An error:"+err+"occurred"))

        
    }

        return(
            <div>
               
               {notification!==""&& <div class="alert alert-danger" role="alert">
  <p>{notification}</p>
</div>
}
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
    <input type="text" onChange={(e)=>setTimeToRead(e.target.value)} value={blogtimetoread} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
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
        <JoditEditor value={blogpost} ref={editor} onChange={(content)=>setPost(content)}/>
        </div>
    
        <LoadingButton variant="contained"loading={loading} onClick={handleSubmit}>Post Blog</LoadingButton>

</form>
            </div>

        )
    }

