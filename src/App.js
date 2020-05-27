import React from 'react';
import { BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import axios from 'axios';
import './App.css';
import {posts} from './data/posts'

import Toolbar from "./components/Toolbar/Toolbar";
import Blog from "./components/Blog/Blog";
import About from "./pages/About/About";
import NewPost from "./pages/NewPost/NewPost";
import Post from "./pages/Post/Post";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      posts: [],
      user: "DBK",
      resp: null
    }

    this.handleAddPost = this.handleAddPost.bind(this);
    this.postsHandler = this.postsHandler.bind(this);
  }

  handleAddPost = (post) => {
    const url = "http://localhost:5000/posts";
    var data = {
      user: this.state.user,
      title: post.title,
      content: post.content, 
    }

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
    const url = "http://localhost:5000/posts"

    axios.get(url)
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          posts: [],
          resp: "Error: failed to get all posts."
        });
      });

      setTimeout(() => {this.setState({resp: null})},5000)
  }


  componentDidMount() {
    this.postsHandler();
  }

  render(){
    return (
      <div className="App">
          <Router basename={process.env.PUBLIC_URL + "/"}>
            <Toolbar/>
            <h3 className="resp">{this.state.resp}</h3>
            <Switch>
              <Route path="/aboutme">
                <About />
              </Route>

              <Route path="/newpost">
                <NewPost handleAddPost={this.handleAddPost} />
              </Route>
              
              <Route path="/post/:postId">
                <Post posts={this.state.posts}/>
              </Route>

              <Route path="/" >
                <Blog posts={this.state.posts}/>  
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
