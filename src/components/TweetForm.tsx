import React from 'react'
import {useForm} from "react-hook-form";
import {Button, Paper, styled, TextField} from "@mui/material";
import {createTweet} from "../api/Tweet";
import {Profile} from "../api/Profile";
import {UserAvatar} from "./UserAvatar";

const StyledPaper = styled(Paper)({
    margin: "5em 0 0 0",
    padding: "16px",
    display: "flex",
    flexDirection: "row",
});

const StyledForm = styled("form")({
    margin: "0 0 0 1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "flex-end",
    width: "100%",
});

const StyledButtonContainer = styled("div")({
    marginTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
});

export type TweetFormProps = {
    profile: Profile;
};

export const TweetForm: React.FC<TweetFormProps> = ({profile}) => {
    const {username, avatar_url} = profile
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = ({tweet}: any) => {
        createTweet({user_id: profile.id, content: tweet}).then(() => console.log(tweet));
    }

    return (
        <StyledPaper variant={"outlined"}>
            <UserAvatar name={username} path={avatar_url}/>
            <StyledForm onSubmit={e => e.preventDefault()}>
                <TextField
                    {...register("tweet", {required: "Text is required"})}
                    name="tweet"
                    error={!!errors.tweet}
                    helperText={errors?.tweet?.message?.toString()}
                    placeholder="What's happening?"
                    fullWidth
                    multiline
                    rows={4}
                />
                <StyledButtonContainer>
                    <Button variant="contained" color="primary" type="submit"
                            onClick={handleSubmit(onSubmit)}>
                        Tweet
                    </Button>
                </StyledButtonContainer>
            </StyledForm>
        </StyledPaper>
    );
};
