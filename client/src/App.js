import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './layouts/Home';
import Landing from './layouts/Landing';



var serverURL='http://localhost:5000'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loggedin: 'NOOOOO'};
  }

  login () {

    let header = new Headers({
    'Access-Control-Allow-Origin':'http://localhost:3000',
    'Content-Type': 'multipart/form-data'
  });
  let sentData={
    method: 'GET',
    mode: 'no-cors',
    header: header
  };

  }

  logged='no'
  componentWillMount() {
    console.log('in willmountxx')


    fetch(serverURL+'/login/isLoggedIn', {method:'GET', credentials:'include'})
    .then(r => {
      console.log ('reply')
      return r.json()

    })
    .then(r => { if (r.user)  {
      this.setState({loggedin:'yes'})
      return console.log('YES r: '+ r)
      }
    })
    .catch(e => console.log('error in componentWillMount: '+ e))
  //this.login()


  }


  render() {
    var loginUrl = serverURL+'/login/google';

    return (
      <div className="App">
      <a href = {loginUrl}> login with google {this.state.loggedin} </a>
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
