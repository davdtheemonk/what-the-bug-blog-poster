import React ,{Component}from "react";
import{Link} from "react-router-dom"
import "./styles.css"



export default class Navbar extends Component{
  render(){
return(
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <img className="nav_img" src="/pic5.webp"></img>
    <a className="navbar-brand" href="#">wtb poster</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
</button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        <Link className="nav-link" to="/">Posts</Link>
        <Link className="nav-link" to="/create">Create posts</Link>
       
        
      </div>
    </div>
  </div>
</nav>
)
}

}
