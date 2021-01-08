import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(8),
        width: '40ch',
      },
    },
    container: {
        margin: '80px auto'
    },
  }));

function NewCompany() {
    const classes = useStyles();
    const [company, setCompany] = useState({
        name: ''
    })

    const handleChange = name => event => {
        setCompany({...company, [name]: event.target.value });
      };

    const handleSubmit = () => {
        axios.post('/api/company/new-company', {company})
        .then(res => {
            window.location.replace('/all-companies')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={classes.container}>
            <Typography align='center' variant="h4">Create New Company</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Company Name" onChange={handleChange('name')} />
            </form>
            <Button color='primary' className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default NewCompany;