import React from 'react';
import { Link } from 'react-router-dom'

class SideNav extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isActive: false,
            item: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.setState({
            item: e.target.closest('a').id
        })
    }

    render(){
        return (
            <div className="sidebar" style={{paddingTop: 0}}>
                <div className="sidebar-inner">
                    {/* ### $Sidebar Header ### */}
                    <div className="sidebar-logo">
                        <div className="peers ai-c fxw-nw">
                            <div className="peer peer-greed">
                                <a className="sidebar-link td-n" href="index.html">
                                    <div className="peers ai-c fxw-nw">
                                        <div className="peer">
                                            <div className="logo">
                                                <img src="assets/static/images/logo.png" alt />
                                            </div>
                                        </div>
                                        <div className="peer peer-greed">
                                            <h5 className="lh-1 mB-0 logo-text">Adminator</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="peer">
                                <div className="mobile-toggle sidebar-toggle">
                                    <a href className="td-n">
                                        <i className="ti-arrow-circle-left" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ### $Sidebar Menu ### */}
                    <ul className="sidebar-menu scrollable pos-r">
                        <li className="nav-item mT-30 active">
                            <Link to="/home">
                                <a className="sidebar-link">
                            <span className="icon-holder">
                                <i className="c-blue-500 ti-home" />
                            </span>
                                    <span className="title">Dashboard</span>
                                </a>
                            </Link>
                        </li>

                        <li className={this.state.item === 'table' ?'nav-item dropdown open':'nav-item dropdown'} >
                            <a className="dropdown-toggle" href="javascript:void(0);" onClick={this.handleClick}  id="table">
                                    <span className="icon-holder">
                                        <i className="c-orange-500 ti-user" />
                                    </span>
                                <span className="title">User</span>
                                <span className="arrow">
                    <i className="ti-angle-right" />
                  </span>
                            </a>
                            <ul className="dropdown-menu" >

                                <li>
                                    <Link to="/users">
                                        <a className="sidebar-link"><i className="ti-eye"> View Users</i></a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/create">
                                        <a className="sidebar-link"><i className="ti-plus"> New User</i></a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={this.state.item === 'maps'?'nav-item dropdown open':'nav-item dropdown'}>
                            <a className="dropdown-toggle" href="javascript:void(0);" onClick={this.handleClick} id="maps">
                                <span className="icon-holder">
                                    <i className="c-purple-500 ti-map" />
                                </span>
                                <span className="title">Maps</span>
                                <span className="arrow">
                                    <i className="ti-angle-right" />
                                </span>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="google-maps.html">Google Map</a>
                                </li>
                                <li>
                                    <a href="vector-maps.html">Vector Map</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )

    };

}

export default SideNav;