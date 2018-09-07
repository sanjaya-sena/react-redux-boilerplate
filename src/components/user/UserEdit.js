import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from "../../actions/userActions";

import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';


class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            large: false
        };
        this.toggleClose = this.toggleClose.bind(this);
    }

    toggleClose(){
        this.setState({
            modal: false
        })
    }

    render(){
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.onEditClick}
                       className={'modal-lg'}>
                    <ModalHeader toggle={this.toggleLarge}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleLarge}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleClose}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
}

Users.propTypes = {
    // user: PropTypes.object
};

const mapStateToProps = state => ({
    // user: state.edit.user
});

export default connect(mapStateToProps,{ fetchUsers })(Users);