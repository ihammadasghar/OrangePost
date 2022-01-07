import React, { Component } from "react";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CommentReplies from './Components/Comments/Replies';
import CreateBlog from './Components/Blogs/Create';
import axios from "axios";
import NotFound from './Components/NotFound';
import Login from './Components/Accounts/Login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BlogDetails from './Components/Blogs/Details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      currentUser: {
        id: '',
        username: ''
      },
      blogsData: null,
      commentsData: null,
      profilesData: null
      
    };
  }
  getBlogs=()=>{
    axios
    .get('/api/blogs/' ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then((res) => this.setState({ blogsData: res.data }))
    .catch((err) => console.log(err));
  }
  getComments=()=>{
    axios
    .get('/api/comments/' ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then((res) => this.setState({ commentsData: res.data }))
    .catch((err) => console.log(err));
  }

  getProfiles=()=>{
    axios
    .get('/api/profiles/'  ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then((res) => this.setState({ profilesData: res.data }) )
    .catch((err) => console.log(err));
  }

  componentDidMount() {
      this.getBlogs();
      this.getComments();
      this.getProfiles();
    }

  

  loginToggle=()=>{
    this.setState({
      isLoggedIn : true,
      currentUser:{
        id : localStorage.getItem('user_id'),
        username : localStorage.getItem('username')
      }
    });
  }
   logout= () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    this.setState({
      isLoggedIn : false,
      currentUser:{}
    });
  }
  render()
  {
    return (
      <Router>
        <div className="App">
          <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.logout}  profilesData={this.state.profilesData}/>
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home blogsData={this.state.blogsData} isLoggedIn={this.state.isLoggedIn} profilesData={this.state.profilesData}/>
              </Route>
              <Route exact path="/login">
                <Login loginToggle={this.loginToggle}/>
              </Route>
              <Route exact path="/blogs/create">
                <CreateBlog isLoggedIn={this.state.isLoggedIn}  profilesData={this.state.profilesData}/>
              </Route>
              <Route exact path="/blogs/:id">
                <BlogDetails isLoggedIn={this.state.isLoggedIn} blogsData={this.state.blogsData} commentsData={this.state.commentsData}  profilesData={this.state.profilesData}/>
              </Route>
              <Route exact path="/comments/:id">
                <CommentReplies isLoggedIn={this.state.isLoggedIn} commentsData={this.state.commentsData}  profilesData={this.state.profilesData}/>
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  
}

export default App;
