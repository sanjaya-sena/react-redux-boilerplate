import React, { Component } from 'react';
import './App.css';
import AdminPanel from './components/templates/AdminPanel';
import Login from './components/auth/Login';
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
                {localStorage.getItem('token')?(
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
