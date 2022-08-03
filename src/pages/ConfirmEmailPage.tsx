import React from 'react'
import {Navigate} from "react-router-dom";
import {Paper, styled, Typography} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

const StyledPaper = styled(Paper)({
    marginTop: "5em",
    padding: "6em 0 6em 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
        margin: "0.3em 0 0.3em 0"
    }
});


export const ConfirmEmailPage = () => {
    let email = new URLSearchParams(window.location.search).get("email");
    if (!email) {
        return <Navigate to={"/error"}/>;
    }

    email = decodeURIComponent(email);

    return (
        <StyledPaper>
            <EmailIcon style={{fontSize: 60}}/>
            <Typography align="center">
                {`We've sent an email to ${email} to confirm your sign up.`}
            </Typography>
        </StyledPaper>
    );
};
