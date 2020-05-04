import React from 'react';
import "../styles/Toolbar.css";

function Toolbar() {
  return (
    <div className="tool-bar">
        <div>
            <a href="">Home</a> |
            <a href="">About Me</a> |
            <a href="">Contact Me</a>
        </div>
        <a href="">Login</a> 
    </div>
  );
}

export default Toolbar;