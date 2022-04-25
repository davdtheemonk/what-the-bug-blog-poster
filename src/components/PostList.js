import React,{useState} from "react";
import axios from "axios"
import Blog from "./Blog"
import { set } from "date-fns";

import "./styles.css"


export default function PostList(){
    const [blogs,setBlogs] =useState([])
    const [notification,setNotification]=useState("")
    const [loading,setLoading]=useState(false)
    const [loader,setLoader] = useState(true)

    axios.get("http://localhost:5000/posts/")
    .then(response=>{
    setLoader(false);
    setBlogs(response.data)
  
    }
    ).catch((err)=>{
    
          setTimeout(() => {
                 setNotification("An error:"+err+"occurred")
               
           }, 5);
           setNotification("")
       
    }
    )
    async function deleteBlog(id){
       await axios.delete(`https://wtb-v1.herokuapp.com/posts/${id}`)
        .then(response=>{
            setNotification("Deleted Blog of id :"+id);
            setLoading(false);
            setBlogs(blogs.filter(blog=>blog.pk!==id));
        })
        .catch((err)=>
        setNotification("An error: "+err+" occurred"))
        
        

    }
    
     const displayBlogs=   blogs.map(blog=>{
            return <Blog setLoading={setLoading} loading={loading} blog={blog} deleteBlog={deleteBlog} notification={notification} key={blog.pk}/>
        })



    return(
        <div>
           {notification!==""&&
            <div class="alert alert-danger" role="alert">
   <p>{notification}</p>
</div>}
{ loader && <div className="loader"><img src="load.gif"/> </div>}
           <h3>Live Blogs</h3>
           
           <table className="table">
               <thead className="thead-light">
                   <tr>
                   <th>Title</th>
                   <th>Posted on</th>
                   <th>Location</th>
                   <th>Image</th>
                   <th>Time to read</th>
                   <th>Description</th>
                   </tr>
               </thead>
               <tbody>
{displayBlogs}
               </tbody>
           </table>
        </div>
    )
}

