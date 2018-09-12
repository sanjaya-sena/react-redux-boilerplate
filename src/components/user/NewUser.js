import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, createUser, resetUsersSuccess, resetUsersMessage } from "../../actions/userActions";

import { Formik } from 'formik';
import * as Yup from "yup";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Input,
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

            this.props.resetUsersSuccess();
            this.props.resetUsersMessage();
        }
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

    onSubmit(values, { resetForm, setErrors, setSubmitting }){

        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
        },2000);

        // notification.config({
        //     placement: 'bottomRight',
        // });

        const user = values;

        this.props.createUser(user);

    }

    SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Minimum password length is 6')
            .required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null],'Password confirmation doesn\'t match')
            .required('Password confirmation is required'),
        role_id: Yup.string()
            .required('Role is required'),
        is_active: Yup.string()
            .required('Status is required')
    });

    render(){

        let rolesSelect = this.state.roles.map((role)=>{
            return (
                <option value={role.id}>{role.name}</option>
            );
        });

        return (
            <Formik
                initialValues={{ email: '', password: '', password_confirmation: '', role_id: '', is_active: '', name: '' }}
                validationSchema={this.SignupSchema}
                onSubmit={this.onSubmit}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (


                    <form className="" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={errors.name && touched.name?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">
                                {errors.name && touched.name && errors.name}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={errors.email && touched.email?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">
                                {errors.email && touched.email && errors.email}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={errors.password && touched.password?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">
                                {errors.password && touched.password && errors.password}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password_confirmation">Password Confirmation</Label>
                            <Input
                                type="password"
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password_confirmation}
                                className={errors.password_confirmation && touched.password_confirmation?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">
                                {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
                            </FormFeedback>
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        type="select"
                                        name="role_id"
                                        placeholder="Role"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.role_id && touched.role_id?'form-control is-invalid':'form-control'}>
                                        <option value="">Select a role</option>
                                        {rolesSelect}
                                    </Input>
                                    <FormFeedback  className="help-block">
                                        {errors.role_id && touched.role_id && errors.role_id}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="status">Status</Label>
                                    <Input
                                        type="select"
                                        name="is_active"
                                        placeholder="Status"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.is_active && touched.is_active?'form-control is-invalid':'form-control'}>>
                                        <option value="">Select a status</option>
                                        <option value={1} >Active</option>
                                        <option value={0} >Disabled</option>
                                    </Input>
                                    <FormFeedback  className="help-block">
                                        {errors.role_id && touched.role_id && errors.role_id}
                                    </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <ModalFooter>
                            <Button color="primary" type="submit" disabled={isSubmitting}>Save</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => {
            dispatch(fetchUsers().then((response)=>{
                console.log(response);
                })
            )
        }
    }
};
// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f
export default connect(mapStateToProps,{ fetchUsers, createUser, resetUsersMessage, resetUsersSuccess })(NewUser);