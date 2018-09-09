import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from "../../actions/userActions";
import UserEdit from "./UserEdit";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from "axios";
import {ADD_ERRORS, LOGIN, REMOVE_ERRORS} from "../../actions/types";
import {Login, Page404, Page500, Register} from "../../views/Pages";
import {DefaultLayout} from "../../containers";


class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal:false,
            userID:""
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
    }

    toggleClose(){
        this.setState({
            modal:false
        })
    };

    componentWillMount(){
        this.props.fetchUsers();
    }

    componentWillReceiveProps(nextProps){

    };

    componentDidMount(){
        // this.setState({rowData:this.props.users});
    }

    onEditClick(e){
        this.setState({
            modal:!this.state.modal,
            userID:e.target.id
        });
    }

    onDeleteClick(e){

    }

    render(){
        let users = this.props.users.map((user)=>{
            return (
                <tr>
                    <td scope="row">{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                        {user.is_active === 1?(
                            <span className="mr-1 badge badge-success badge-pill">Active</span>
                        ):(
                            <span className="mr-1 badge badge-danger badge-pill">Disabled</span>
                        )}
                    </td>
                    <td style={{width:"80px"}}>
                        <button id={user.id} className="btn btn-success btn-sm" onClick={this.onEditClick}><i className="fa fa-edit"> </i></button>
                        <button id={user.id} className="btn btn-danger btn-sm" onClick={this.onDeleteClick}><i className="fa fa-trash"> </i></button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <strong><i className="fa fa-user"> </i> Users List</strong>
                            </CardHeader>
                            <CardBody>
                                <Row >
                                    <Col lg={12}>
                                        <Table responsive className="table-sm table-clear table-hover">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th style={{width:"80px"}}> </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {users}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggleClose} className={'modal-md'}>
                        <ModalHeader toggle={this.toggleClose}><i className="fa fa-user"> </i> Edit User</ModalHeader>
                        <ModalBody>
                            <UserEdit userID={this.state.userID} />
                        </ModalBody>
                    </Modal>
                </Row>
            </div>
        );
    };
}

Users.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    users: state.users.items
});

export default connect(mapStateToProps,{ fetchUsers, fetchUser })(Users);