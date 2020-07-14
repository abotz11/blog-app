import React from 'react';
import {Link, NavLink} from  'react-router-dom'
import CommentsSection from "../CommentsSection/CommentsSection";
// import "./BlogPost.css";

class BlogPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            title: props.title,
            content: props.content,
            date: props.date,
            publisher: props.publisher,
            avatarSrc: props.avatarSrc,
            user: props.user,
            comments: props.comments
        }
    }

    deletePost = () =>{
        this.props.handleDeletePost(this.state.id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.comments !== prevProps.comments) {
          this.setComments();
        }
    
        if (this.props.title !== prevProps.title) {
          this.setTitle();
        }

        if (this.props.content !== prevProps.content) {
            this.setContent();
          }
      }
    
    setComments = () =>{
        this.setState({
            comments: this.props.comments
        })
    }
    
    setTitle = () =>{
        this.setState({
            title: this.props.title
        })
    }

    setContent = () =>{
        
        this.setState({
            content: this.props.content
        })
    }

    render(){
        const {id, title, content, date, publisher, avatarSrc, user, comments} = this.state;
        return (
            <div className="blog-post-and-commentes">
                <div className="blog-post"> 
                    <div className="blog-text">
                        <div className="blog-text-block">
                            <h4><Link to={`/post/${id}`}>{title}</Link></h4>
                            <p>{content}</p>
                        </div>
                        <div className="blog-published">                
                            <div>Updated {getTimeOfUpdate(date)} ago by {publisher}</div>
                        </div>
                    </div>
                    <div>
                        <div className="avatar-img">
                            <img src={avatarSrc} alt=""/>
                        </div>
                        
                        <div>
                            {(user == publisher)? 
                                <div>
                                    <div className="modifier-content">
                                            <NavLink className="modifier"
                                                to={{
                                                    pathname:"/newpost",
                                                    state:{ 
                                                        title: this.state.title,
                                                        content: this.state.content,
                                                        id: this.state.id
                                                    }
                                                    }}>
                                                <i class="fa fa-gear" aria-hidden="true"></i>
                                            </NavLink>
                                
                                            <NavLink className="modifier"
                                                to="/" 
                                                onClick={this.deletePost} 
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
                <div className="blog-commentes">
                    <CommentsSection 
                    comments={comments}
                    postId={id}
                    user={user}
                    getTimeOfUpdate={getTimeOfUpdate}
                    handleDeleteComment={this.props.handleDeleteComment}
                    handleAddComment={this.props.handleAddComment}/>
                </div>
            </div>
          );
    }
}

function getTimeOfUpdate(date){
    var curr_date = new Date();
    var update_date = new Date(date);
 
    var seconds = Math.floor((curr_date.getTime() / 1000) - (update_date.getTime() / 1000))
    var minutes =  Math.floor(seconds / 60)
    var hours =  Math.floor(minutes / 60)
    var days =  Math.floor(hours / 24)
    var months =  Math.floor(days / 30)
    var years = Math.floor(months / 15)

    var update_date_text = "";
    if(years > 0){
        update_date_text = years + " year";
        if(years!=1){
            update_date_text+="s";
        }
    }else if(months > 0){
        update_date_text = months + " month";
        if(months!=1){
            update_date_text+="s";
        }
    }else if(days > 0){
        update_date_text = days + " day";
        if(days!=1){
            update_date_text+="s";
        }
    }else if(hours > 0){
        update_date_text = hours + " hour";
        if(hours!=1){
            update_date_text+="s";
        }
    }else if(minutes > 0){
        update_date_text = minutes + " minute";
        if(minutes!=1){
            update_date_text+="s";
        }
    }else if(seconds > 0){
        update_date_text = seconds + " second";
        if(seconds!=1){
            update_date_text+="s";
        }
    }else{
        update_date_text = "now";
    }

    return update_date_text;
}

export default BlogPost;