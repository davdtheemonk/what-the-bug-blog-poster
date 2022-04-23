import React,{useState} from "react";
import{Link} from "react-router-dom"
import "./styles.css"



export default function Blog(props){
return(
    <div>
    {props==null?
    <div className="blog__cont_over">
        <img className="serverimg" src="/server.svg"/>
        <p>Oops!! I snapped</p></div>:
    <div>
    <td>
        <tr>{props.blog.title}</tr>
        <tr>{props.blog.date}</tr>
        <tr>{props.blog.location}</tr>
        <tr>{props.blog.image}</tr>
        <tr>{props.blog.timetoread}</tr>
        <tr>{props.blog.post}</tr>
    </td>
    <td>
        <Link to={"/edit/"+props.blog.pk}>edit</Link> | <a href="#" onClick={()=>{
            props.deleteBlog(props.blog.pk)

        }}>delete</a>
    </td>
</div>
 
    }
       </div>
)    
}
