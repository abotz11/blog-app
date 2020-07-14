import React from 'react';
// import './Login.css'

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="login">
                Username: <input type="text"   name="user" onChange={this.props.handleChange} ></input><br/>
                Password: <input type="password" name="pass" onChange={this.props.handleChange} ></input><br/>
                <button to='/' onClick={this.props.handleLogin}>Login</button><br/><br/>
            </div>
          );
    }
  }
  
export default Login;