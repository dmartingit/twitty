import React from "react"
import {useAuth} from "../contexts/AuthContext";
import {useProfile} from "../hooks/UseProfile";
import {Link as RouterLink, Navigate} from "react-router-dom";
import {PageLoading} from "../components/PageLoading";
import {UserAvatar} from "../components/UserAvatar";
import {Button, Link, Paper, styled, Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

// const useStyles = makeStyles((theme) => ({
//         paper: {
//             margin: "4em 0 0 0",
//             padding: "3em 0 3em 0",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//         },
//         avatar: {
//             margin: "0 0 1em 0",
//             width: "8em",
//             height: "8em",
//         },
//     })
// );

const StyledPaper = styled(Paper)({
    marginTop: "5em",
    padding: "3em 0 3em 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const avatarStyles = {
    margin: "0 0 1em 0",
    width: "8em",
    height: "8em",
};

export const ViewProfilePage: React.FC = () => {
    const {session} = useAuth();

    let userIdQuery = new URLSearchParams(window.location.search).get("userId");

    const [profile, profileError, profileLoading] = useProfile("id", userIdQuery || session?.user?.id);

    if (!session && !userIdQuery) {
        return <Navigate to="/sign-in"/>;
    }

    if (profileLoading) {
        return <PageLoading/>;
    }

    if (profileError) {
        return <Navigate to="/error"/>;
    }

    if (userIdQuery && !profile) {
        return (
            <StyledPaper>
                <ErrorIcon style={{fontSize: 60}}/>
                <Typography>
                    The user ({userIdQuery}) does not exist!
                </Typography>
            </StyledPaper>
        );
    }

    if (!profile) {
        if (session) {
            return <Navigate to="/profile/edit"/>;
        } else {
            return <Navigate to="/sign-in"/>;
        }
    }

    return (
        <>
            <StyledPaper>
                <UserAvatar name={profile.username} path={profile.avatar_url} sx={avatarStyles}/>
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
            </StyledPaper>
        </>
    );
};
