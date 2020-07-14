import React from 'react';
import {useParams} from  'react-router-dom'
// import "./Post.css"

function Post(props) {
  let { postId } = useParams();
  let post = props.findPost(postId);

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <br/>
      <p>{post.content}</p>
    </div>
  )};
  
export default Post;