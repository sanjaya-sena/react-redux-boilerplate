import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from "../../actions/userActions";

class Users extends React.Component {

    componentWillMount(){
        this.props.fetchUsers();
    }
    
    componentWillReceiveProps(nextProps){

    };

    render(){
        const users = this.props.users.map(user => (
            <tr key={user.id}>
                <th scope="row">Image</th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button className="btn cur-p btn-outline-primary btn-sm"><i className="ti-back-right"> </i></button>
                    <button className="btn cur-p btn-outline-danger btn-sm"><i className="ti-trash"> </i></button>
                </td>
            </tr>
        ));
        return (
            <div className="container-fluid"><h4 className="c-grey-900 mT-10 mB-30">Users List</h4>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bgc-white bd bdrs-3 p-20">
                            <h4 className="c-grey-900 mB-20">System Users</h4>

                            <table className="table table-hover ">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">id</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {users}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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