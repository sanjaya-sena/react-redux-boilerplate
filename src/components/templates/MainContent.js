import React from 'react';
import Dashboard from "../Dashboard";
import Users from "../user/Users";
import UseCreate from "../user/UserCreate";
import { Route } from 'react-router-dom'

class MainContent extends React.Component {

    render(){
        return (
            <main className="main-content bgc-grey-100">
                <div id="mainContent">
                    <div className="container-fluid">
                        <Route path="/home" exact component={Dashboard}/>
                        <Route path="/users" exact component={Users}/>
                        <Route path="/user/create" exact component={UseCreate}/>
                    </div>
                </div>
            </main>
        )

    };

}

export default MainContent;