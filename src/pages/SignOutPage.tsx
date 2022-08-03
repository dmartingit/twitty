import React, {useEffect} from "react";
import {Link as RouterLink} from "react-router-dom";
import {SupabaseClient} from "../api/SupabaseClient";
import {Button, Link, Paper, styled, Typography} from "@mui/material";

const StyledPaper = styled(Paper)({
    margin: "5em 0 0 0",
    padding: "6em 0 6em 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
        margin: "0.6em 0 0.6em 0"
    },
});

export const SignOutPage = () => {
    useEffect(() => {
        SupabaseClient.auth.signOut().then(console.log);
    }, [])

    return (
        <StyledPaper>
            <Typography variant="h5" align="center">
                You've been signed out
            </Typography>
            <div>
                <Link underline="none" to="/" component={RouterLink} color="inherit">
                    <Button color="inherit">Go to Home Page</Button>
                </Link>
                <Link
                    underline="none"
                    to="/sign-in"
                    component={RouterLink}
                    color="inherit"
                >
                    <Button color="inherit">Sign In</Button>
                </Link>
            </div>
        </StyledPaper>
    );
};
