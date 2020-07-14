import React from 'react';
// import "./About.css"

function About() {
    return (
      <div className="about">
        <h1>About Me</h1>
        <section>
            Welcome!!!
            <br/>My name is Abotzvi Yadgarov from Holon, Israel, and this is my blog app
            <br/>I'm an undergraguate student from IDC majoring Computer Science
            <br/>Sign in and be part of our community.
        </section>
        <br/>
        <section>
            for more information:
            <br/>
            <ul id="menu">
                <li>     
                    <a href="tel:+972549729340">
                        <i className="fa fa-phone"/>
                    </a>
                </li>
                <li>
                    <a href="mailto:abotzvi.yadgarov@gmail.com">
                        <i className="fa fa-at"/>
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/avi.yadgarov">
                        <i className="fa fa-facebook"/>
                    </a>
                </li>
                <li>
                    <a href="http://www.github.com/abotz11">
                        <i className="fa fa-github"/>
                    </a>
                </li>
                <li>
                    <a href="http://www.linkedin.com/in/abotzvi-yadgarov-68ab45157/">
                        <i className="fa fa-linkedin"/>
                    </a>
                </li>
            </ul>      
        </section>
      </div>
    );
  }
  
export default About;