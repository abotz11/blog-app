import React from 'react';
import "./NewPost.css"





class NewPost extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        var titleTxt = document.getElementById("title").value;
        var contentTxt = document.getElementById("content").value;
        var newPost = {
            title: titleTxt,
            content: contentTxt
        }

        this.props.handleAddPost(newPost);
    }

    render(){
        return (
            <div className="new-post">
                <h1>Create new post</h1>
                <input id="title" type="text" placeholder="Post title goes here..."></input>
                <textarea id="content" placeholder="Post content goes here..."></textarea>
                <button onClick={this.handleClick}>Save post</button>
            </div>
          );
    }
  }
  
export default NewPost;