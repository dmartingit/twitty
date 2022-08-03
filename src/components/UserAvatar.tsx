import React from "react"
import { useQuery } from "react-query";
import {fetchAvatar} from "../api/Avatar";
import {Avatar, SxProps, Theme} from "@mui/material";


export type UserAvatarProps = {
    path?: string
    name?: string
    sx?: SxProps<Theme>
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, path, sx }) => {
    const { data } = useQuery(
        ['avatar', path],
        fetchAvatar,
        {
            enabled: !!path,
            staleTime: 1000 * 60 * 60, // 1 hour
        }
    );

    return <Avatar sx={sx} alt={name} src={data} />;
};
