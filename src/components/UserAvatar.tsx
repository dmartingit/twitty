import React from "react"
import { Avatar } from "@material-ui/core";
import { useQuery } from "react-query";
import {FetchAvatar} from "../api/Avatar";


export type UserAvatarProps = {
    path?: string
    name?: string
    className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, path, className }) => {
    const { data } = useQuery(
        ['avatar', path],
        FetchAvatar,
        {
            enabled: !!path,
            staleTime: 1000 * 60 * 60, // 1 hour
        }
    );

    return <Avatar className={className} alt={name} src={data} />;
};
