import React from 'react';
// import {Link} from 'react-router-dom';

function SideSection(props) {
  const listItems = props.posts.map((item) => (
    <h3>Blog post #{item} <a href="">go to page</a></h3>
  ));

  return (
    <div>
        <h1>{props.title}</h1>
        {listItems}
    </div>
  );
}

export default SideSection;