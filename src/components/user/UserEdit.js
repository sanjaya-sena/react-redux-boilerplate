import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, updateUser, fetchUser } from "../../actions/userActions";


import { Button, ModalFooter } from 'reactstrap';
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
import { notification, Spin, Icon } from 'antd';


class UserEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user:{},
            roles:[],
            userID:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){

        if ( newProps.fetched !== this.props.fetched && newProps.fetched === true ) {
            this.state.user = newProps.user;
        }

        if ( newProps.updated !== this.props.updated && newProps.updated === true ) {
            this.props.closeModal();
            notification.config({
                placement: 'bottomRight',
                duration: 10,
            });
            notification.open({
                message:'Success',
                description: 'User updated successfully !',
                icon:<Icon type="check" style={{ color: '#0ee936' }} />
            });
        }

    }

    componentWillMount(){


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

        this.props.fetchUser(this.props.userID);
    };

    onChange(e) {
        this.setState({
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value
            }});
        console.log(this.state.user);
    }

    onSubmit(e){
        e.preventDefault();

        const user = this.state.user;

        this.props.updateUser(user);
    }

    render(){

        let rolesSelect = this.state.roles.map((role)=>{
            let selected = !!(this.state.user && this.state.user.role && this.state.user.role.name === role.name);
            return (
                <option value={role.id} selected={selected}>{role.name}  </option>
            );
        });

        const {loading, user, success, errors} = this.props;

        return (

            <div>
                <Spin spinning={loading === true}>
                    <Form className="" onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label htmlFor="inputWarning2i">Name</Label>
                            <Input name="name"  placeholder="Email" value={this.state.user?this.state.user.name:'loading'}  onChange={this.onChange} className={errors && errors.name?'form-control is-invalid':'form-control'}  />
                            <FormFeedback  className="help-block">{errors && errors.name ? this.props.errors.name[0]:''}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="inputWarning2i">Email</Label>
                            <Input name="email"  placeholder="Email" value={this.state.user?this.state.user.email:'loading'}  onChange={this.onChange} className={errors && errors.email?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">{errors && errors.email ? this.props.errors.email[0]:''}</FormFeedback>
                            {/*<FormFeedback valid className="help-block"><i className="fa fa-check"> </i></FormFeedback>*/}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="inputWarning2i">Password</Label>
                            <Input name="password" type="password"  placeholder="Password" value=""  onChange={this.onChange} className={errors && errors.password?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">{errors && errors.password ? this.props.errors.password[0]:''}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="inputWarning2i">Password</Label>
                            <Input name="password_confirmation" type="password"  placeholder="Password" value=""  onChange={this.onChange} className={errors && errors.password?'form-control is-invalid':'form-control'} />
                            <FormFeedback  className="help-block">{errors && errors.password ? this.props.errors.password[0]:''}</FormFeedback>
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="role">Role</Label>
                                    <Input type="select" name="role_id" onChange={this.onChange} className={errors && errors.role_id?'form-control is-invalid':'form-control'}>
                                        <option value="">Select</option>
                                        {rolesSelect}
                                    </Input>
                                    <FormFeedback  className="help-block">{errors && errors.role_id ? this.props.errors.role_id[0]:''}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="status">Status</Label>
                                    <Input type="select" name="is_active" onChange={this.onChange} className={errors && errors.is_active?'form-control is-invalid':'form-control'}>
                                        <option value="">Select</option>
                                        <option value={1} selected={this.state.user?this.state.user.is_active === 1:false}>Active</option>
                                        <option value={0} selected={this.state.user?this.state.user.is_active === 0:false}>Disabled</option>
                                    </Input>
                                    <FormFeedback  className="help-block">{errors && errors.is_active ? this.props.errors.is_active[0]:''}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <ModalFooter>
                            <Button color="primary">Save</Button>
                        </ModalFooter>
                    </Form>
                </Spin>

            </div>
        );
    };
}

UserEdit.propTypes = {
    updateUser: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    errors: PropTypes.object,
    user: PropTypes.object.isRequired,
    fetching: PropTypes.object.isRequired,
    fetched: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.users.user.data,
    loading: state.users.user.loading,
    errors: state.users.user.error,
    fetched:state.users.user.fetched,
    updated:state.users.user.updated
});

export default connect(mapStateToProps,{ fetchUsers, updateUser, fetchUser })(UserEdit);