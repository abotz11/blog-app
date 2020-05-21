import React from 'react';
import BlogPosts from "../BlogPosts/BlogPosts";
import "./Mainbar.css";


function Mainbar(props) {
  return (
    <div className="main-bar">
       <h1>This is my blog</h1>
        <BlogPosts posts={props.posts}/>
    </div>
  );
}

export default Mainbar;