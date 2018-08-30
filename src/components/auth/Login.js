import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ADD_ERRORS } from "../../actions/types";

import { connect } from 'react-redux';
import { login } from '../../actions/authActions'

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(){
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(user);
    }

    onChange(e) {
        if(!!this.props.errors[e.target.name]){
            let errors = Object.assign({},this.props.errors);
            delete errors[e.target.name];
            //
            // this.props.dispatch({
            //     type: ADD_ERRORS,
            //     items: errors
            // })
        }else{
            this.setState({
                [e.target.name]:e.target.value
            });
        }
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.props.classes.layout}>
                    <Paper className={this.props.classes.paper}>
                        {this.props.errors.error?(
                            <MessageBar messageBarType={MessageBarType.error}>
                                {this.props.errors.error}
                            </MessageBar>
                        ):''}
                        <Avatar className={this.props.classes.avatar}>
                            <LockIcon />
                        </Avatar>


                        <Typography variant="headline">Sign in</Typography>
                        <form className={this.props.classes.form} onSubmit={this.onSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    name="email"
                                    email
                                    autoFocus
                                    label="Email Address"
                                    errorMessage={this.props.errors.email}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <FormControl margin="normal"  fullWidth>
                                <TextField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    errorMessage={this.props.errors.password}
                                    onChange={this.onChange}
                                />
                            </FormControl>
                            <DefaultButton
                                text='Sign in'
                                primary={ true }
                                type="submit"
                                fullWidth
                                variant="raised"
                            />
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
};
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors.items
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps,{ login }))(Login);