import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, resetUserErrors } from "../../actions/userActions";
import UserEdit from "./UserEdit";
import NewUser from "./NewUser";
import { Badge, Card, CardBody, CardHeader, Col, Row, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Table, Divider, Tag, Button, Modal } from 'antd';


import { HashRouter, Route, Switch } from 'react-router-dom';
import axios from "axios";
import {ADD_ERRORS, LOGIN, REMOVE_ERRORS} from "../../actions/types";
import {Login, Page404, Page500, Register} from "../../views/Pages";
import {DefaultLayout} from "../../containers";

const { Column, ColumnGroup } = Table;
const ButtonGroup = Button.Group;

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];
class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal:false,
            userID:"",
            clearForm:false
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
        this.onNewUserClick = this.onNewUserClick.bind(this);
    }

    toggleClose(){
        this.setState({
            modal:false,
            userID:""
        });
        this.props.resetUserErrors();
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

    onNewUserClick(e){
        this.setState({
            modal:!this.state.modal,
            userID:""
        });
    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render(){

        return(
            <div className="animated fadeIn">

                <Row>

                    <Col lg={12}>

                        <Card>

                            <CardHeader>

                                <i className="fa fa-user"> </i> Users List
                                <button onClick={this.onNewUserClick} className="btn btn-primary btn-sm pull-right"><i className="fa fa-plus"> </i> New User</button>

                            </CardHeader>

                            <CardBody>

                                <Row >

                                    <Col lg={12}>

                                        <Table dataSource={this.props.users} size="small" scroll={{ x: 240 }}>
                                            <Column
                                                title="Name"
                                                dataIndex="name"
                                                key="name"
                                                fixed="left"
                                            />
                                            <Column
                                                title="Email"
                                                dataIndex="email"
                                                key="email"
                                            />
                                            <Column
                                                title="Role"
                                                dataIndex="role"
                                                key="role"
                                                render={role => (
                                                    <span>
                                <Tag color="blue" key={role.id}>{role.name}</Tag>
                        </span>
                                                )}
                                            />
                                            <Column
                                                title="Status"
                                                dataIndex="is_active"
                                                key="is_active"
                                                render={is_active => (
                                                    <span>
                            {is_active===1?(
                                <Tag color="green" key={is_active}>Active</Tag>
                            ):(
                                <Tag color="red" key={is_active}>Disabled</Tag>
                            )}

                        </span>
                                                )}
                                            />
                                            <Column
                                                title="Action"
                                                dataIndex="id"
                                                key="id"

                                                fixed="right"
                                                width={100}
                                                render={(id) => (
                                                    <span>
                                                        <ButtonGroup>
                                                          <Button id={id} onClick={this.onEditClick} type="default" icon="edit"/>
                                                          <Button type="danger" icon="delete"/>
                                                        </ButtonGroup>
                                                    </span>
                                                )}
                                            />

                                        </Table>


                                    </Col>

                                </Row>

                            </CardBody>

                        </Card>

                    </Col>

                </Row>

                <Row>


                    <Modal
                        title={this.state.userID === ""?(<h5><i className="fa fa-user"> </i> New User</h5>):(<h5><i className="fa fa-user"> </i> Edit User</h5>)}
                        visible={this.state.modal}
                        onCancel={this.toggleClose}
                        zIndex={1011}
                        centered
                        footer=""
                    >
                        {this.state.userID === ""?(<NewUser />):(<UserEdit userID={this.state.userID} />)}

                    </Modal>

                </Row>

            </div>

        )

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

export default connect(mapStateToProps,{ fetchUsers, fetchUser, resetUserErrors })(Users);