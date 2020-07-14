import React from 'react';
import {NavLink} from  'react-router-dom'
// import "./Comment.css";


class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            publisher: props.publisher,
            content: props.content,
            date: props.date,
            user: props.user,
        }; 
    }

    deleteComment = () =>{
        this.props.handleDeleteComment(this.state.id)
    }

    render(){
        const {id, publisher, content, date, user} = this.state;
        
        return (
            <div>
                <div className="comment">
                    <div>
                        <div>
                            <h4>{content}</h4>
                        </div>
                        <div>                
                            <h5>Updated {this.props.getTimeOfUpdate(date)} ago by {publisher}</h5>
                        </div>
                    </div>

                    <div className="modifierbtn">
                        {(user == publisher)? 
                            <div>
                                <div >
                                    <NavLink 
                                        to="/" 
                                        onClick={this.deleteComment} 
                                        style={{color: "red"}}>
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </NavLink>
                                </div>
                            </div>
                        :
                            ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;