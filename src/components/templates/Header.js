import React from 'react';
import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';

class Header extends React.Component {
    onClick(e){
        e.target.isExpanded = true;
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search"/>
                    aria-label="Search">
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link" href="#">Sign out</a>
                        </li>
                    </ul>
                </nav>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                            <div className="sidebar-sticky">
                                <div className="ms-NavExample-LeftPane">
                                    <Nav
                                        groups={[
                                            {
                                                links: [
                                                    {
                                                        name: 'Home',
                                                        links: [
                                                            {
                                                                name: 'Activity',
                                                                key: 'key1'
                                                            },
                                                            {
                                                                name: 'News',
                                                                key: 'key2'
                                                            }
                                                        ],
                                                        isExpanded: false
                                                    },
                                                    { name: 'Documents',
                                                        links: [
                                                            {
                                                                name: 'Activity',
                                                                key: 'key1'
                                                            },
                                                            {
                                                                name: 'News',
                                                                key: 'key2'
                                                            }
                                                        ],  key: 'key3', isExpanded: false },
                                                    { name: 'Pages',  key: 'key4' },
                                                    { name: 'Notebook',  key: 'key5' },
                                                    { name: 'Long Name Test for ellipse',  key: 'key6' },
                                                    {
                                                        name: 'Edit',
                                                        onClick: this._onClickHandler2,
                                                        icon: 'Edit',
                                                        key: 'key8'
                                                    },
                                                    {
                                                        name: 'Delete',
                                                        onClick: this._onClickHandler2,
                                                        iconProps: { iconName: 'Delete' },
                                                        key: 'key9'
                                                    }
                                                ]
                                            }
                                        ]}
                                        expandedStateText={'expanded'}
                                        collapsedStateText={'collapsed'}
                                        selectedKey={'key3'}
                                    />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        )

    };

}

export default Header;