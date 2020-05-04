import React from 'react';
import BlogPost from "./BlogPost";
// import "../styles/Mainbar.css";


function BlogPosts() {
    const listItems = posts.map((item) => (
        <BlogPost 
            key={item.id}
            postNum={item.postNum} 
            text={item.text} 
            days={item.days} 
            publisher={item.publisher} 
            avatarSrc={item.avatarSrc}/> 
    ));

    return (
        <div className="blog-posts">
            {listItems}
        </div>
    );
}

const posts =[
    {id:1, postNum:1, text:"My <b>first blog post</b> is all about my <b style='color: red;'>blog post</b> and how to write a new post in my blog, you can find it <a href=''>here</a>", days:1,publisher:"Israel",avatarSrc:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/58/ballot-box-with-x_2612.png"},

    {id:2, postNum:2, text:"My <b>second blog post</b> is all about my blog post", days:2,publisher:"Joe",avatarSrc:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/58/ballot-box-with-x_2612.png"},

    {id:3, postNum:3, text:"My <b>third blog post </b> is all about my blog post", days:3,publisher:"Israel",avatarSrc:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/58/ballot-box-with-x_2612.png"}
];

export default BlogPosts;