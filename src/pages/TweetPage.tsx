import React from "react"
import {useMutation, useQuery, useQueryClient} from "react-query";
import {styled} from "@mui/material";
import {TweetForm} from "../components/TweetForm";
import {TweetList} from "../components/TweetList";
import {useAuth} from "../contexts/AuthContext";
import {fetchProfileById} from "../api/Profile";
import {createTweet} from "../api/Tweet";

const StyledContainer = styled("div")({
    margin: "4em 0 4em 0",
});

export const TweetPage = () => {
    const {session} = useAuth()
    const {data} = useQuery(['profile', session?.user?.id], async () => {
        return await fetchProfileById(session!.user!.id)
    }, {
        enabled: !!session?.user?.id,
        staleTime: 3600
    })

    return (
        <StyledContainer>
            {data ? <TweetForm profile={data}/> : null}
            <TweetList/>
        </StyledContainer>
    );
};
