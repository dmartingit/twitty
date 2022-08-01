import {makeStyles, Paper, Typography} from "@material-ui/core";
import React from "react"
import ErrorIcon from '@material-ui/icons/Error';
import {useAuth} from "../contexts/AuthContext";
import {useProfile} from "../hooks/UseProfile";
import {Link as RouterLink, Navigate} from "react-router-dom";
import {PageLoading} from "../components/PageLoading";
import {UserAvatar} from "../components/UserAvatar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
        paper: {
            margin: "4em 0 0 0",
            padding: "3em 0 3em 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: "0 0 1em 0",
            width: "8em",
            height: "8em",
        },
    })
);

export const ViewProfilePage: React.FC = () => {
    const classes = useStyles();
    const {session} = useAuth();

    let userIdQuery = new URLSearchParams(window.location.search).get("userId");

    const [profile, profileError, profileLoading] = useProfile("id", userIdQuery || session?.user?.id);

    if (!session && !userIdQuery) {
        return <Navigate to="/signin"/>;
    }

    if (profileLoading) {
        return <PageLoading/>;
    }

    if (profileError) {
        return <Navigate to="/error"/>;
    }

    if (userIdQuery && !profile) {
        return (
            <Paper variant="outlined" className={classes.paper}>
                <ErrorIcon style={{fontSize: 60}}/>
                <Typography>
                    The user ({userIdQuery}) does not exist!
                </Typography>
            </Paper>
        );
    }

    if (!profile) {
        if (session) {
            return <Navigate to="/profile/edit"/>;
        } else {
            return <Navigate to="/signin"/>;
        }
    }

    return (
        <>
            <Paper variant="outlined" className={classes.paper}>
                <UserAvatar name={profile.username} path={profile.avatar_url} className={classes.avatar}/>
                <Typography variant="h5" align="center">
                    {profile.username}
                </Typography>
                <Link
                    underline="none"
                    to="/profile/edit"
                    component={RouterLink}
                    color="inherit"
                >
                    <Button>
                        Edit
                    </Button>
                </Link>
            </Paper>
        </>
    );
};
