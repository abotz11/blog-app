import React from 'react';
import Mainbar from "./Mainbar";
import Sidebar from "./Sidebar";
import "../styles/Blog.css";

function Blog() {
  return (
    <div className="blog">
       <Mainbar/>
       <Sidebar/>
    </div>
  );
}

export default Blog;