import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, createUser, resetUsersSuccess, resetUsersMessage } from "../../actions/userActions";


import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
    Badge,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import axios from "axios/index";
import {FETCH_USER} from "../../actions/types";

import 'antd/dist/antd.css';
import { notification } from 'antd';


class NewUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user:{},
            roles:[]
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if (newProps.success === true){
            notification.open({
                message: 'Success',
                description: newProps.message_notify,
                style: {
                    color:"green"
                },
            });

            this.setState({
                user:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:'',
                    role_id:'',
                    is_active:''
                }
            });

            this.props.resetUsersSuccess();
            this.props.resetUsersMessage();
        }

        // if (newProps.clearForm === true){
        //     this.setState({
        //         user:{
        //             name:'',
        //             email:'',
        //             password:'',
        //             password_confirmation:'',
        //             role_id:'',
        //             is_active:''
        //         }
        //     });
        // }
    }

    componentDidMount(){

        axios.get('/roles').then(
            (request)=>{
                this.setState({
                    roles:request.data.data
                })
            }
        ).catch( error => {
            console.log(error.response.data.data);

        });
    };

    onChange(e) {
        this.setState({
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value
            }});
    }

    onSubmit(e){
        e.preventDefault();

        notification.config({
            placement: 'bottomRight',
        });

        const user = this.state.user;

        this.props.createUser(user);

    }

    render(){

        let rolesSelect = this.state.roles.map((role)=>{
            return (
                <option value={role.id}>{role.name}  </option>
            );
        });

        return (

            <Form className="" onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label htmlFor="inputWarning2i">Name</Label>
                    <Input name="name"  placeholder="Email" value={this.state.user.name}  onChange={this.onChange} className={this.props.errors.name?'form-control is-invalid':'form-control'}  />
                    <FormFeedback  className="help-block">{this.props.errors.name ? this.props.errors.name[0]:''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputWarning2i">Email</Label>
                    <Input name="email"  placeholder="Email" value={this.state.user.email}  onChange={this.onChange} className={this.props.errors.email?'form-control is-invalid':'form-control'} />
                    <FormFeedback  className="help-block">{this.props.errors.email ? this.props.errors.email[0]:''}</FormFeedback>
                    {/*<FormFeedback valid className="help-block"><i className="fa fa-check"> </i></FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputWarning2i">Password</Label>
                    <Input name="password" type="password"  placeholder="Password" value={this.state.user.password}  onChange={this.onChange} className={this.props.errors.password?'form-control is-invalid':'form-control'} />
                    <FormFeedback  className="help-block">{this.props.errors.password ? this.props.errors.password[0]:''}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputWarning2i">Password</Label>
                    <Input name="password_confirmation" type="password"  placeholder="Password" value={this.state.user.password_confirmation}  onChange={this.onChange} className={this.props.errors.password?'form-control is-invalid':'form-control'} />
                    <FormFeedback  className="help-block">{this.props.errors.password ? this.props.errors.password[0]:''}</FormFeedback>
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="role">Role</Label>
                            <Input type="select" name="role_id" onChange={this.onChange} className={this.props.errors.role_id?'form-control is-invalid':'form-control'}>
                                <option value="">Select</option>
                                {rolesSelect}
                            </Input>
                            <FormFeedback  className="help-block">{this.props.errors.role_id ? this.props.errors.role_id[0]:''}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="status">Status</Label>
                            <Input type="select" name="is_active" onChange={this.onChange} className={this.props.errors.is_active?'form-control is-invalid':'form-control'}>
                                <option value="">Select</option>
                                <option value={1} >Active</option>
                                <option value={0} >Disabled</option>
                            </Input>
                            <FormFeedback  className="help-block">{this.props.errors.is_active ? this.props.errors.is_active[0]:''}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <ModalFooter>
                    <Button color="primary">Save</Button>
                </ModalFooter>
            </Form>
        );
    };
}

NewUser.propTypes = {
    createUser: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    errors: PropTypes.object,
    success: PropTypes.bool,
    message_notify: PropTypes.sttring
};

const mapStateToProps = state => ({
    errors: state.errors.items,
    success: state.users.success,
    message_notify: state.users.message
});

export default connect(mapStateToProps,{ fetchUsers, createUser, resetUsersMessage, resetUsersSuccess })(NewUser);