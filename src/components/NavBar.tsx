import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Badge, Button, IconButton, Link, styled, Toolbar, Typography, useTheme} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAuth} from "../contexts/AuthContext";
import {useColorMode} from "../contexts/ColorModeContext";
import {NotificationBell} from "./NotificationBell";

const StyledAppBar = styled(AppBar)({
    flexGrow: 1,
});

const StyledTitle = styled(Typography)({
    flexGrow: 1,
});

export const NavBar = () => {
    const theme = useTheme();
    const colorMode = useColorMode();
    const {session} = useAuth();

    return (
        <StyledAppBar position="fixed" sx={{flexGrow: 1}}>
            <Toolbar>
                <StyledTitle variant="h6" sx={{flexGrow: 1}}>
                    <Link underline="none" component={RouterLink} to="/" color="inherit">
                        Twitty
                    </Link>
                </StyledTitle>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
                <IconButton color="inherit">
                    <NotificationBell/>
                </IconButton>
                <Link underline="none" component={RouterLink} to="/profile" color="inherit">
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <AccountCircle/>
                        </Badge>
                    </IconButton>
                </Link>
                {
                    session ?
                        <Link underline="none" component={RouterLink} to="/sign-out" color="inherit">
                            <Button color="inherit">
                                Sign out
                            </Button>
                        </Link>
                        :
                        <Link underline="none" to="/sign-in" component={RouterLink} color="inherit">
                            <Button color="inherit">
                                Sign In
                            </Button>
                        </Link>
                }
            </Toolbar>
        </StyledAppBar>
    );
};
