import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
    borderRadius: '50px'
  },
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  form: {
        '& > *': {
            margin: theme.spacing(1),
            }
    }
}));

function NewUser(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [invitation, setInvitation] = useState({
      firstName: '',
      lastName: '',
      email: '',
      _id: props.company._id,
      companyName: props.company.name
  })
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    setInvitation({...invitation, [name]: event.target.value });
  };

  const handleSubmit = () => {
      axios.post('/api/invitation/new-invitation', {invitation})
      .then(res => {
          window.location.replace('/all-companies')
      })
      .catch(err => console.log(err))
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography align='center' variant='h5'>Add a New User to {props.company.name}</Typography>
      <form className={classes.form}>
          <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField id="standard-basic" label="First Name" onChange={handleChange('firstName')}/>
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField id="standard-basic" label="Last Name" onChange={handleChange('lastName')}/>
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField id="standard-basic" label="Email" onChange={handleChange('email')}/>
              </Grid>
          </Grid>
      </form>
      <Button color='primary' onClick={handleSubmit}>Submit</Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen}><AddIcon />New User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default NewUser;