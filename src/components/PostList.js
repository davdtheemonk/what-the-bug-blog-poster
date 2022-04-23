import React,{useState} from "react";
import axios from "axios"
import Blog from "./Blog"




export default function PostList(){
    const [blogs,setBlogs] =useState([])
    axios.get("http://localhost:5000/posts/")
    .then(response=>{

    setBlogs(response.data)
    console.log(blogs)
    }
    ).catch((err)=>{
        console.log(err)
    }
    )
    const deleteBlog=(id)=>{
        axios.get("http://localhost:5000/posts/"+id)
        .then(response=>console.log(response.data));
        setBlogs(blogs.filter(el=>el.pk!=id))
    }
    
     const displayBlogs=   blogs.map(blog=>{
            return <Blog blog={blog} deleteBlog={deleteBlog} key={blog.pk}/>
        })
        console.log(displayBlogs)     
    

    return(
        <div>
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

