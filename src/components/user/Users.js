import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from "../../actions/userActions";
import UserEdit from "./UserEdit";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from "axios";
import {ADD_ERRORS, LOGIN, REMOVE_ERRORS} from "../../actions/types";


class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    componentWillMount(){
       this.props.fetchUsers();
    }

    componentWillReceiveProps(nextProps){

    };

    componentDidMount(){
        // this.setState({rowData:this.props.users});
    }

    onEditClick(e){
        axios.get('/users/100').then(
            (request)=>{
                console.log(request)
            }
        ).catch( error => {
            console.log(error.response.data.data);

        });

        this.setState({
            modal:!this.state.modal
        })

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
                    <td>{user.name}</td>
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
                                                <th>Table heading</th>
                                                <th>Table heading</th>
                                                <th>Table heading</th>
                                                <th style={{width:"80px"}}> </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {users}
                                            <UserEdit modal={this.state.modal} onEditClick={this.onEditClick}/>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
}

Users.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    users: state.users.items
});

export default connect(mapStateToProps,{ fetchUsers })(Users);