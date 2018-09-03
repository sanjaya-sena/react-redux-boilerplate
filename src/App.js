import React, { Component } from 'react';
import './App.css';
import AdminPanel from './components/templates/AdminPanel';
import Login from './components/auth/Login';
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
      let auth = JSON.parse(localStorage.getItem('auth'));
    return (
        <Provider store={store}>
            <div>
                {auth && auth.user && auth.token?(
                    <AdminPanel />
                ):(
                    <Login />
                )}
            </div>
        </Provider>
    );
  }
}

export default App;
