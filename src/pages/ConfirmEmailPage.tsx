import {Paper, makeStyles, Typography} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react'
import {Navigate} from "react-router-dom";

const useStyles = makeStyles(t => ({
    paper: {
        marginTop: "4em",
        padding: "6em 0 6em 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
            margin: "0.3em 0 0.3em 0"
        }
    }
}));


export const ConfirmEmailPage = () => {
    const classes = useStyles();

    let email = new URLSearchParams(window.location.search).get("email");
    if (!email) {
        return <Navigate to={"/error"} />;
    }

    email = decodeURIComponent(email);

    return (
        <Paper variant="outlined" className={classes.paper}>
            <MailIcon style={{fontSize: 60}}/>
            <Typography align="center">
                {`We've sent an email to ${email} to confirm your sign up.`}
            </Typography>
        </Paper>
    );
};