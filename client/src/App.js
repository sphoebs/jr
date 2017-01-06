import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './layouts/Home';
import Landing from './layouts/Landing';

class App extends Component {

  login () {

    let header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
  });
  let sentData={
    method: 'GET',
    mode: 'no-cors',
    header: header
  };

    var google_url = "https://accounts.google.com/o/oauth2/v2/auth?scope=profile"+
    "&response_type=code"+
    "&client_id=1093539287627-urgjti6ok0dt59v0snvahqskvr6a95js.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost:5000%2Flogin%2Fgoogle%2Fcallback";


    google_url = 'http://localhost:5000/login/google'
    fetch(google_url, sentData)
    //.then (r => {return r.text()})
    .then(r => {
                for (var value of r.headers.values()) {
                      console.log(value);
                    }
                  return true})
    .catch (error => console.log('error'+ error))
  }

  componentWillMount() {
    console.log('in willmount')
  this.login()
  }


  render() {
    return (
      <div className="App">
      <a href = 'http://localhost:5000/login/google'> login </a>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
