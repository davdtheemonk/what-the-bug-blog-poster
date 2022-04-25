import React,{useState} from "react";
import{Link} from "react-router-dom"
import "./styles.css"
import { LoadingButton } from '@mui/lab';



export default function Blog(props){
   
return(

   
    <tr>
        <td>{props.blog.title}</td>
        <td>{props.blog.date}</td>
        <td>{props.blog.location}</td>
        <td>{props.blog.image}</td>
        <td>{props.blog.timetoread}</td>
        <td>{props.blog.post.substring(0,10)+"...."}</td>
   
    <td>
        <Link className="btn btn-primary"  to={"/edit/"+props.blog.pk}>edit</Link> |  <LoadingButton loading={props.loading} sx={{backgroundColor:"red"}} className="btn btn-danger" variant="contained" onClick={()=>{props.deleteBlog(props.blog.pk);
        props.setLoading(true);}}>delete</LoadingButton>
 
 </td>
    </tr>

)    
}
