import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import {connect} from 'react-redux';
import {signIn} from '../../actions/users';
import {withRouter, Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    container: {
        textAlign: 'center',
        width: '300px',
        margin: '200px auto'
    },
    field: {
        width: '250px'
    },
    link: {
        textDecoration: 'none'
    }
  }));

function Login(props) {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value})
    }

    const handleSubmit = () => {
        const {dispatch} = props;
        dispatch(signIn(user));
    }

    return(
        <div className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container className={classes.root} spacing={3}>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Email" className={classes.field} value={user.email} onChange={handleChange('email')}/>  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Password" type='password' className={classes.field} value={user.password} onChange={handleChange('password')}/>
                    </Grid>
                </Grid>
                <Button color='primary' onClick={handleSubmit}>Login</Button>
            </form>
        </div>
    )
}

export default withRouter(connect()(Login));