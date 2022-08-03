import React from "react";
import {Badge} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

export const NotificationBell: React.FC = () => {
    return (
        <>
            <Badge color="secondary">
                <NotificationsIcon/>
            </Badge>
        </>
    );
};
