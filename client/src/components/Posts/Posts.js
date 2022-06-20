import axios from "axios";
import { Component } from "react";

// Posts component
// we need state for posts, relies on axios call -> state

// componentDidMount
// axios call to /posts, include the token, from sessionStorage.authToken

// render
// map over posts, display UI

class Posts extends Component {
    state = {
        posts: [],
        hasErrorLoading: false
    }

    componentDidMount() {
        const token = sessionStorage.authToken;

        // axios call to /posts, include the token, from sessionStorage.authToken
        axios.get("http://localhost:8080/posts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            this.setState({ 
                posts: response.data.posts 
            });            
        })
        .catch(() => {
            this.setState({
                hasErrorLoading: true
            })
            sessionStorage.removeItem("authToken");
        })
    }


  render() {
    if (this.state.hasErrorLoading) {
        return <h2>Error loading posts. Please refresh the page</h2>
    }
    
    // Show something if posts aren't loaded yet
    if (this.state.posts.length === 0) {
        return <h2>Loading posts...</h2>;
    }

    return (
        <>
            {this.state.posts.map(post => (
                <div>
                    <h2>{post.id}</h2>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </>
    );
  }
}

export default Posts;
