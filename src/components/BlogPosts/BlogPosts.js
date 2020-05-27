import React from 'react';
import BlogPost from "../BlogPost/BlogPost";
// import "../styles/Mainbar.css";


class BlogPosts extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }; 
    }


    render(){
        const listItems = this.props.posts.map((item) => (
            <BlogPost 
                key={item.id}
                id={item.id}
                title={item.title} 
                content={item.content} 
                date={item.last_update} 
                publisher={item.user_name} 
                avatarSrc={item.img_src}/> 
        ));
    
        return (
            <div className="blog-posts">
                {listItems}
            </div>
        );
    }
}

export default BlogPosts;