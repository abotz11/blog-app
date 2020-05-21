import React from 'react';
import {Link} from  'react-router-dom'
import "./BlogPost.css";

function BlogPost(props) {
  return (
    <div className="blog-post">
        <div className="blog-text">
            <div className="blog-text-block">
                <h4><Link to={`/post/${props.id}`}>{props.title}</Link></h4>
                <p>{props.content}</p>
            </div>
            <div className="blog-published">
                <p>Published {props.days} days ago by {props.publisher}</p>
            </div>
        </div>
        <div className="avatar-img">
            <img src={props.avatarSrc} alt=""/>
        </div>
    </div>
  );
}

export default BlogPost;