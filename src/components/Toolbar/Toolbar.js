import React from 'react';
import {Link} from  'react-router-dom'
import "./Toolbar.css";

function Toolbar() {
  return (
    <div className="tool-bar">
      <div>
        <Link to="/">Home</Link> |
        <Link to="/aboutme">About Me</Link> |
        <Link to="/newpost">New Post</Link>
      </div>
      <Link>Login</Link> 
    </div>
  );
}

export default Toolbar;