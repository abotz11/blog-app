import React from 'react';
import Comment from "../Comment/Comment";
import "./CommentsSection.css";
import { NavLink } from 'react-router-dom';


class CommentsSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newCommentContent: null,
            postId: props.postId,
        }; 

        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter = (e) => {
        var newComment = {
            content: this.state.newCommentContent,
            postId: this.state.postId
        }
        
        this.props.handleAddComment(newComment);
        window.location='/'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        const listItems = this.props.comments.map((item) => (
            <Comment
                key={item.id}
                id={item.id}
                publisher={item.user_name}
                user={this.props.user}
                content={item.content}
                date={item.last_update}
                getTimeOfUpdate={this.props.getTimeOfUpdate}
                handleDeleteComment={this.props.handleDeleteComment}
            />
        ));
        
        return (
            <div>
                <div>
                    
                    {listItems}
                </div>
                <div>
                    {/* <div className="new-comment-header">
                        {/* <h5>post a comment</h5>
                        <h5>
                            <NavLink 
                                className="modifier"
                                onClick={this.handleEnter}
                                to='/'>
                                post
                            </NavLink>
                            </h5> 
                    </div> */}
                    <textarea
                        name="newCommentContent"
                        className="new-comment"
                        onChange={this.handleChange} 
                        placeholder="Post comment goes here..."
                        onKeyDown={(e) => (e.keyCode == 13)? this.handleEnter(e): null}
                        
                        // value={this.state.newCommentContent}
                        >
                    
                    </textarea> 
                </div>
            </div>
        );
    }
}

export default CommentsSection;