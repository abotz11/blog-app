import React from 'react';
import BlogPosts from "./BlogPosts";
import "../styles/Mainbar.css";


function Mainbar() {
  return (
    <div className="main-bar">
       <h1>This is my blog</h1>
        <BlogPosts/>
    </div>
  );
}

export default Mainbar;