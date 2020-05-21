import React from 'react';
import SideSection from '../SideSection/SideSection';
import "./Sidebar.css";


function Sidebar() {
  return (
    <div className="side-bar">
          <SideSection title="Latest" posts={[1,2,3]}/>
        <hr/>
        <SideSection title="Popular" posts={[3,1,2]}/>
    </div>
  );
}

export default Sidebar;