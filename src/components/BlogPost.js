import React from 'react';
import "../styles/BlogPost.css";
import parse from 'html-react-parser';


function BlogPost(props) {
  return (
    <div className="blog-post">
        <div className="blog-text">
            <div className="blog-text-block">
                <h4>Blog post #{props.postNum}</h4>
                <p>{parse(props.text)}</p>
            </div>
            <div className="blog-published">
                <p>Published {props.days} days ago by {props.publisher}</p>
            </div>
        </div>
        <div className="avatar-img">
            <img height="50" width="50" src={props.avatarSrc} alt=""/>
        </div>
    </div>
  );
}

export default BlogPost;