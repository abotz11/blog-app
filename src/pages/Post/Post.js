import React from 'react';
import {useParams} from  'react-router-dom'
import "./Post.css"


const findPost = (posts, postId) =>{
  var foundPost = null;

  posts.forEach(post => {
    if (post.id == postId){
      foundPost = post;
    }
  });

  return foundPost;
}

function Post(props) {
  let { postId } = useParams();
  let post = findPost(props.posts, postId);

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <br/>
      <p>{post.content}</p>
    </div>
  )};
  
export default Post;