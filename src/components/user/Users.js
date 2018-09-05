import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from "../../actions/userActions";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

class Users extends React.Component {

    componentWillMount(){
        this.props.fetchUsers();
    }
    
    componentWillReceiveProps(nextProps){

    };

    render(){
        const users = this.props.users.map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td width="100px">
                    <button className="btn btn-outline-primary btn-sm"><i className="fa fa-edit"> </i></button>
                    <button className="btn  btn-outline-warning btn-sm"><i className="fa fa-trash"> </i></button>
                </td>
            </tr>
        ));
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <strong><i className="fa fa-user"> </i> Users List</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover className="table-sm">
                                    <tbody>
                                    {users}
                                    </tbody>
                                </Table>
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