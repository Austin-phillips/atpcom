import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Button } from '@material-ui/core';
import NewUser from './NewUser';

const useStyles = makeStyles({
    tableContainer: {
        width: '90%',
        margin: '100px auto',
        textAlign: 'center'
    },
    table: {
      minWidth: 650,
    },
    container: {
        margin: '80px auto'
    }
  });

function AllCompanies(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        function onLoad() {
            axios.get(`/api/company/`)
            .then(res => {
                setCompanies(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
        onLoad()
      }, [props])

    if(loading) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return(
            <div className={classes.container}>
                <Typography align='center' variant='h4'>All Companies</Typography>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell align="right">Users</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {companies.map((row) => (
                            <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.users.length}</TableCell>
                            <TableCell align="right">
                                <NewUser company={row}/>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default AllCompanies;