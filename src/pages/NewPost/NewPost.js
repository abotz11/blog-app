import React from 'react';
import {NavLink} from  'react-router-dom'
// import "./NewPost.css"

class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title: "",
            content: "",
            id: "",
            editMode: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        var newPost = {
            title: this.state.title,
            content: this.state.content,
            id: this.state.id
        }
        
        this.state.editMode? this.props.handleEditPost(newPost) : this.props.handleAddPost(newPost);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    componentDidMount() {
        if(this.props.state){
            this.setState({
                title: this.props.state.title,
                content: this.props.state.content,
                id: this.props.state.id,
                editMode: true,
            })
        }
    }

    render(){
        const { state } = this.props
        return (
            <div className="new-post">
                {this.state.editMode? 
                    <h1>Edit Post</h1>
                    :
                    <h1>Create Post</h1>
                }

                <input 
                    name="title" 
                    type="text" 
                    onChange={this.handleChange} 
                    placeholder="Post title goes here..."
                    value={this.state.title}>      
                </input>

                <textarea 
                    name="content" 
                    onChange={this.handleChange} 
                    placeholder="Post content goes here..."
                    value={this.state.content}>
                </textarea>

                <NavLink to="/"><button onClick={this.handleClick}>Save post</button></NavLink>
            </div>
          );
    }
  }
  
export default NewPost;