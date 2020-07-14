import React from 'react';
import { BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import axios from 'axios';
// import './App.css';

import Toolbar from "./components/Toolbar/Toolbar";
import Blog from "./components/Blog/Blog";
import About from "./pages/About/About";
import NewPost from "./pages/NewPost/NewPost";
import Post from "./pages/Post/Post";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      comments: [],
      user: null,
      pass: null,
      name: null,
      resp: null,
      isLoggedIn: false
    };
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  handleLogin = (e) => {
    const url = "/login";
    const data = {
      user: this.state.user,
      pass: this.state.pass,
    }

    axios.post(url, data)
      .then((res) => {
        this.postsHandler();
        this.setState({
          isLoggedIn: true,
          resp: "Success: user logged in."
        });
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          resp: "Error: failed to login user."
        });
      });
  }

  handleSignIn = (e) => {
    const url = "/signin";
    const data = {
      user: this.state.user,
      pass: this.state.pass,
      name: this.state.name,
    }

    axios.post(url, data)
      .then((res) => {
        this.postsHandler();
        this.setState({
          isLoggedIn: true,
          resp: "Success: user signed in."
        });
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          resp: "Error: failed to signed user."
        });
      });
  }

  handleLogout = () => {
    const url = "/logout";
    const data = {
      user: this.state.user,
    }

    axios.post(url, data)
      .then((res) => {
        this.setState({
          posts: [],
          user: null,
          pass: null,
          name: null,
          resp: "Success: user logged out.",
          isLoggedIn: false
        });
      })
      .catch((err) => {
        this.setState({
          resp: "Error: failed to logout user."
        });
      });

      setTimeout(() => {this.setState({resp: null})},5000)
  }

  handleAddPost = (post) => {
    const url = "/posts";
    var data = {
      user: this.state.user,
      title: post.title,
      content: post.content, 
    };

    axios.post(url, data)
      .then((res) => {
        this.postsHandler();
        this.setState({
          resp: "Success: post added."
        });
        
      })
      .catch((err) => {
        this.setState({
          resp: "Error: failed to add post."
        });
    });
  }

  postsHandler = () =>{
    const url = "/posts"

    axios.get(url)
      .then((res) => {
        this.commentsHandler();
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          posts: [],
          resp: "Error: failed to get all posts, need to Login / Sign in."
        });
      });

      setTimeout(() => {this.setState({resp: null})},5000)
  }

  handleAddComment = (newComment) => {
    const url = "/comments";
    var data = {
      user: this.state.user,
      content: newComment.content,
      post: newComment.postId
    };

    axios.post(url, data)
      .then((res) => {
        this.postsHandler();
        this.setState({
          resp: "Success: comment added."
        });
        
      })
      .catch((err) => {
        this.setState({
          resp: "Error: failed to add comment."
        });
    });
  }

  commentsHandler = () =>{
    const url = "/comments"

    axios.get(url)
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          comments: [],
          resp: "Error: failed to get all comments, need to Login / Sign in."
        });
      });

      setTimeout(() => {this.setState({resp: null})},5000)
  }

  handleDeleteComment = (postId) =>{
    const url = "/deleteComment"
    var data = {
      postId: postId, 
    };
    axios.post(url, data)
    .then((res) => {
      this.postsHandler();
      this.setState({
        resp: "Success: comment deleted."
      });
    })
    .catch((err) => {
      this.setState({
        posts: [],
        resp: "Error: failed to delete comment."
      });
    });
  }

  checkIfLogedIn = () =>{
    const url = "/login"

    axios.get(url)
      .then((res) => {
        this.postsHandler();
        this.setState({
          user: res.data["user_name"],
          name: res.data["full_name"],
          isLoggedIn: true
        });
      })
      .catch((err) => {
        this.setState({
          user: null,
          name: null,
          isLoggedIn: false,
        });
      });
  }

  handleEditPost = (post) =>{
    const url = "/posts"
    var data = {
      user: this.state.user,
      title: post.title,
      content: post.content, 
      id: post.id
    };

    axios.put(url, data)
      .then((res) => {
        this.postsHandler();
        this.setState({
          resp: "Success: post edited."
        });
        
      })
      .catch((err) => {
        this.setState({
          resp: "Error: failed to edit post."
        });
    });
  }

  handleDeletePost = (postId) =>{
    const url = "/deletePost"
    var data = {
      postId: postId, 
    };
    axios.post(url, data)
    .then((res) => {
      this.postsHandler();
      this.setState({
        resp: "Success: post deleted."
      });
    })
    .catch((err) => {
      this.setState({
        posts: [],
        resp: "Error: failed to delete post."
      });
    });
  }

  findPost = (postId) =>{
    var foundPost = null;
  
    this.state.posts.forEach(post => {
      if (post.id == postId){
        foundPost = post;
      }
    });
  
    return foundPost;
  }

  componentDidMount() {
    this.checkIfLogedIn();
  }

  render(){
    return (
      <div className="App">
          <Router basename={process.env.PUBLIC_URL + "/"}>
            <Toolbar isLoggedIn={this.state.isLoggedIn} user={this.state.user} handleLogout={this.handleLogout}/>
            <h3 className="resp">{this.state.resp}</h3>
            <Switch>
              <Route path="/login">
                <Login handleChange={this.handleChange} handleLogin={this.handleLogin}/>
              </Route>

              <Route path="/signin">
                <SignIn handleChange={this.handleChange} handleSignIn={this.handleSignIn}/>
              </Route>

              <Route path="/aboutme">
                <About />
              </Route>

              <Route 
                path="/newpost"
                render={({ location }) => {
                  const { state } = location;
                  return (
                    <NewPost 
                      handleAddPost={this.handleAddPost} 
                      handleEditPost={this.handleEditPost} 
                      state={state} 
                    />
                  )}}
              />
_
              <Route path="/post/:postId">
                <Post findPost={this.findPost}/>
              </Route>

              <Route path="/" >
                <Blog 
                posts={this.state.posts}
                comments={this.state.comments}
                user={this.state.user}
                handleDeletePost={this.handleDeletePost}
                handleDeleteComment={this.handleDeleteComment}
                handleAddComment={this.handleAddComment}/>  
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;