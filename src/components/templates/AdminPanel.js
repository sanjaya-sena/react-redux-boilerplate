import React from 'react';

import SideNav from "./SideNav";
import Header from './Header';
import MainContent from "./MainContent";
import Footer from "./Footer";

class AdminPanel extends React.Component {

    render(){
        return (
            <div>
                <SideNav />

                <div className="page-container">

                    <Header />

                    <MainContent />


                    <Footer />

                </div>
            </div>
        )

    };

}

export default AdminPanel;