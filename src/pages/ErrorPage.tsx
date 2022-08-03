import React from 'react'
import {Paper, styled, Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

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

export const ErrorPage = () => {
    return (
        <StyledPaper>
            <ErrorIcon style={{fontSize: 60}}/>
            <Typography>
                Oops! Something went wrong. Please try again.
            </Typography>
        </StyledPaper>
    );
};
