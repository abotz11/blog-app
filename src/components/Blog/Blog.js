import React from 'react';
import Mainbar from "../Mainbar/Mainbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Blog.css";

function Blog(props) {
  return (
    <div className="blog">
       <Mainbar 
       posts={props.posts}
       comments={props.comments} 
       user={props.user}
       handleDeletePost={props.handleDeletePost}
       handleDeleteComment={props.handleDeleteComment}
       handleAddComment={props.handleAddComment}/>
       <Sidebar/>
    </div>
  );
}

export default Blog;