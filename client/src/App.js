import { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts/Posts';
// We need a form for login
// When should we show the login form?
// When should we show the posts?

// Form:
   // submit handler:
      // Axios call to /login
        // SUCCESS: store token in sessionStorage, isLoggedIn = true

        // ERROR: keep isLoggedIn = false  
// state for isLoggedIn  => boolean (true or false)
    // True: show Posts
    // False: show login

class App extends Component {
  state = {
    isLoggedIn: !!sessionStorage.authToken
  }

  handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/login", {
      username: e.target.username.value ,
      password: e.target.password.value
    })
    .then(({ data }) => {
      // SUCCESS: store token in sessionStorage, isLoggedIn = true
      sessionStorage.authToken = data.token;
      this.setState({
        isLoggedIn: true
      })

    }).catch(() => {
      alert("Login failed");
    })
    

    

    return false;
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Posts />;
    }

    return (
      <>
        <h1>Please login:</h1>
        <form onSubmit={this.handleLogin}>
          <label>Username:<input type="text" name="username" /></label>
          <label>Password:<input type="text" name="password" /></label>
          <input type="submit" value="Log in, plz" />
        </form>
      </>
    );
  }
}

export default App;
