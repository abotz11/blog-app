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
                <p>Updated {getTimeOfUpdate(props.date)} ago by {props.publisher}</p>
            </div>
        </div>
        <div className="avatar-img">
            <img src={props.avatarSrc} alt=""/>
        </div>
    </div>
  );
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