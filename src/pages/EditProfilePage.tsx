import {makeStyles, Paper, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {SupabaseClient} from "../api/SupabaseClient";
import {ProfileForm, ProfileFormProps} from '../components/ProfileForm';
import {useAuth} from '../contexts/AuthContext';
import {Navigate} from "react-router-dom";
import {PROFILES_TABLE} from "../api/Database";
import {useProfile} from "../hooks/UseProfile";
import {useUpload} from "../hooks/UseUpload";
import {PageLoading} from "../components/PageLoading";
import {definitions} from "../api/Types";
import {UserAvatar} from "../components/UserAvatar";
import {UploadButton} from "../components/UploadButton";

const useStyles = makeStyles(theme => ({
        paper: {
            margin: "4em 0 0 0",
            padding: "6em 0 6em 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: "1.5em 0 1em 0",
            width: "8em",
            height: "8em",
        },
    })
);

export type CreateProfilePageProps = {};

export const EditProfilePage: React.FC<CreateProfilePageProps> = () => {
    const classes = useStyles();
    const {session} = useAuth();
    const [saved, setSaved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profile, profileError, profileLoading] = useProfile("id", session?.user?.id);
    const [usernameExists, setUsernameExists] = useState(false);
    const [onUpload, uploadedAvatarUrl, uploadError, isUploading] = useUpload(session);

    if (!session) {
        return <Navigate to={"/signin"}/>;
    }

    if (profileLoading) {
        return <PageLoading/>;
    }

    const onSubmit: ProfileFormProps["onSubmit"] = async ({
                                                              username,
                                                              website,
                                                          }) => {
        setUsernameExists(false);
        setSaved(false);
        setIsSubmitting(true);
        const {error} = await SupabaseClient.from<definitions["profiles"]>(PROFILES_TABLE).upsert({
            id: session?.user?.id,
            username,
            website,
            avatar_url: uploadedAvatarUrl ?? undefined
        });

        if (!error) {
            setSaved(true);
        } else {
            if (error.code === "23505") {
                setUsernameExists(true);
            }
        }
        setIsSubmitting(false);
    };

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Typography variant="h5" align="center">
                {profile ? "Edit Your Profile" : "Create Your Profile"}
            </Typography>
            <UserAvatar name={profile?.username || session.user?.email} path={uploadedAvatarUrl || profile?.avatar_url}
                        className={classes.avatar}/>
            <UploadButton onUpload={onUpload}/>
            <ProfileForm
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                usernameExists={usernameExists}
                username={profile?.username}
                website={profile?.website}
            />
            {saved && <Typography>Saved!</Typography>}
        </Paper>
    );
};
