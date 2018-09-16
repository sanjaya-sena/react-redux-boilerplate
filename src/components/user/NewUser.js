import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchUsers, createUser } from "../../actions/userActions";

import { Form, withFormik } from 'formik';
import * as Yup from "yup";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
    Col,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Row,
} from 'reactstrap';

import axios from "axios/index";

import 'antd/dist/antd.css';
import { notification, Button } from 'antd';

class NewUserA extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user:{},
            roles:[]
        };
    }

    componentWillReceiveProps(newProps){

        if (newProps.success !== this.props.success && newProps.success === true){
            notification.open({
                message: 'Success',
                description: 'User Created Successfully!',
                style: {
                    color:"green"
                },
            });
            this.props.closeModal();
            this.props.resetForm();
        }
        if (newProps.errorss && this.props.errorss !== newProps.errorss){
            this.props.setErrors(newProps.errorss);
        }
        console.log(this.props);
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
        // this.props.actions.fetchUsers();
    };

    render(){

        let rolesSelect = this.state.roles.map((role)=>{
            return (
                <option value={role.id}>{role.name}</option>
            );
        });

        const { loading, errors, touched, handleBlur, handleChange, handleReset, values  } = this.props;

        return (
            <Form className="">
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
                    <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
                    <Button type="primary" onClick={handleReset}>Reset</Button>
                </ModalFooter>
            </Form>
        );
    };
}

const NewUser = withFormik({
    mapPropsToValues({email,name,password,password_confirmation,role_id,is_active}){
        return {
            email:email||'',
            name:name||'',
            password:password||'',
            password_confirmation:password_confirmation||'',
            role_id:role_id||'',
            is_active:is_active||''
        }
    },
    validationSchema: Yup.object().shape({
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
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, props }){
        const user = values;
        props.createUser(user);
    }
})(NewUserA);

NewUser.propTypes = {
    createUser: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    error: PropTypes.object,
    closeModal: PropTypes.func.isRequired
};

NewUser.defaultProps = {
    errorss:null
};

const mapStateToProps = state => ({
    user: state.users.user.data,
    loading: state.users.user.loading,
    success: state.users.user.success,
    errorss: state.users.user.error
});

// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f
// https://medium.com/skyshidigital/simplify-redux-request-success-failure-pattern-ce77340eae06
// https://daveceddia.com/where-fetch-data-redux/
// https://www.sohamkamani.com/blog/2016/06/05/redux-apis/
// https://www.sitepoint.com/crud-app-react-redux-feathersjs/
export default connect(mapStateToProps, { createUser })(NewUser);