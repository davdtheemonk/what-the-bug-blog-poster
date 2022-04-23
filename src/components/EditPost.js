import React,{useState,useRef} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import TextField from '@mui/material/TextField';
import DatePicker from "react-date-picker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import JoditEditor from "jodit-react"
import axios from "axios"

import{Link} from "react-router-dom"



export default function EditPost(props) {
    const [title,setTitle] = useState("");
    const [location,setLocation] = useState("")
    const [date,setDate] = useState(new Date())
    const [post,setPost] = useState("")
    const [timetoread,setTimeToRead]  = useState("")
    const [image,setImage]  = useState("")
    const [blogs,setBlogs] = useState([]);
    const editor = useRef(null)
    axios.get('http://localhost:5000/posts/'+props.match.params.pk)
    .then(response=>{
       setTitle(response.title);
       setLocation(response.location);
       setDate(new Date(response.date));
       setPost(response.post);
       setTimeToRead(response.timetoread);
       setImage(response.image);

    })
       const handleSubmit = (e)=>{
        e.preventDefault();
        const Blog = {
            title :title,
            date : date,
            location :location,
            image : image,
            post : post,
            timetoread: timetoread,
        
        }
        axios.post("http://localhost:5000/posts/update"+props.match.params.pk)
        .then(res=>console.log(res.data))
        window.location ="/"
    }

        return(
            <div>
               


<form onSubmit={handleSubmit}>
  <div className="mb-2">
    
    <label className="form-label">Title of the Blog</label>
    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" id="title" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-2">
    <label  className="form-label">Location</label>
    <input type="text"onChange={(e)=>setLocation(e.target.value)} value={location}  className="form-control" id="location" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-2">
    <label  className="form-label">Image id from Unsplash</label>
    <input type="text" onChange={(e)=>setImage(e.target.value)} value={image}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-2">
    <label className="form-label">Time to read</label>
    <input type="text" onChange={(e)=>setTimeToRead(e.target.value)} value={timetoread} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
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
          value={date}
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
        <JoditEditor ref={editor} onChange={(e)=>setPost(e.target.value)}/>
        </div>
    
  <button type="submit" className="btn btn-primary">Edit Blog</button>
</form>
            </div>

        )
    }

