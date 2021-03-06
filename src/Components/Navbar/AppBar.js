import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import DrawerContainer from './drawer';
import { Link, withRouter, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration: 'none'
  },
}));

function Nav(props) {
  const classes = useStyles();

  const loginButton = () => {
    const {user} = props;
    if(user._id) {
        return <Button className="button" variant="contained" onClick={() => handleLogout()}>Logout</Button> 
    } else {
        return(
            <Link className={classes.link} to='/login'>
                <Button className="button" variant="contained">Login</Button> 
            </Link>
        )
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.replace('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <DrawerContainer user={props.user}/>
          <Typography align='left' variant="h6" className={classes.title}>
            {props.company.name}
          </Typography>
          {loginButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
    return { user: state.user, company: state.company}
}

export default withRouter(connect(mapStateToProps)(Nav));