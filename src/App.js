import React, { Component } from 'react';
import './App.css';
import Users from './components/Users';
import Login from './components/auth/Login';
import Header from './components/templates/Header';
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">

                {localStorage.getItem('token')?(
                    <Header />
                ):(
                    <Login />
                )}
            </div>
        </Provider>
    );
  }
}

export default App;
