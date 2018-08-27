import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from "../actions/userActions";

class Users extends React.Component {

    componentWillMount(){
        this.props.fetchUsers();
    }
    
    componentWillReceiveProps(nextProps){

    };

    render(){
        const users = this.props.users.map(user => (
            <div key={user.id}>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        ));
        return (
            <div>
                <h1>Users</h1>
                {users}
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