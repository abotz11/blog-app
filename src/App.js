import React from 'react';
import { BrowserRouter as Router, Switch, Route} from  'react-router-dom'
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
      posts:null
    }

    this.handleAddPost = this.handleAddPost.bind(this);
    this.generateId = this.generateId.bind(this);
  }

  handleAddPost = (post) => {
    var id = this.generateId();
    var newPost = {
      id: id,
      title: post.title,
      content: post.content, 
    }
    
    this.setState({
      post: this.state.posts.unshift(newPost)
    });

    alert("The post has added!!!")
  }

  generateId = () =>{
    var id = 0;
    posts.forEach(post => {
      if (id < post.id){
        id = post.id
      }
    });

    return id+1;
  }


  componentWillMount() {
    this.setState({
      posts: posts
    });
  }

  render(){
    return (
      <div className="App">
          <Router basename={process.env.PUBLIC_URL + "/"}>
            <Toolbar/>
          
            <Switch>
              <Route path="/aboutme">
                <About />
              </Route>

              <Route path="/newpost">
                <NewPost handleAddPost={this.handleAddPost}/>
              </Route>
              
              <Route path="/post/:postId">
                <Post posts={this.state.posts}/>
              </Route>

              <Route path="/">
              {!this.state.posts ?
                <h4>Loading..</h4>:
                <Blog posts={this.state.posts}/>  
              }
              </Route>
            </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
