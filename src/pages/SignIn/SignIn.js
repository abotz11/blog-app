import React from 'react';
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="sign-in">
                Full Name: <input type="text" name="name" onChange={this.props.handleChange}></input><br/>
                Username: <input type="text" name="user" onChange={this.props.handleChange}></input><br/>
                Password: <input type="password" name="pass" onChange={this.props.handleChange}></input><br/>
                <button onClick={this.props.handleSignIn}>Sign In</button><br/><br/>
            </div>
          );
    }
  }
  
export default SignIn;