import React from 'react'
import {Routes ,Route ,BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component'
import PostList from './components/PostList'
import EditPost from './components/EditPost'
import CreatePost from './components/CreatePost'
function App() {
  return (
<BrowserRouter>
     <Navbar/>
     <br></br>
     <div className="container mt-3">
     <Routes>
     
     <Route path="/" element={<PostList/>}/>
     <Route path="/edit/:id"  element={<EditPost/>}/>
     <Route path="/create"  element={<CreatePost/>}/>

   </Routes>
   </div>
   </BrowserRouter>
    
  );
}

export default App;
