import React from "react"
import {useQuery} from "react-query"
import {TweetCard} from "./TweetCard";
import {useAuth} from "../contexts/AuthContext";
import {fetchTweets} from "../api/Tweet";
import {Card, CircularProgress, styled} from "@mui/material";

const StyledCard = styled(Card)({
    marginTop: '4em',
    padding: '6em 0 6em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledContainer = styled("div")({
    marginTop: '4em',
    padding: '6em 0 6em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export type TweetListProps = {
    userIdToFilterBy?: string
};

export const TweetList: React.FC<TweetListProps> = ({userIdToFilterBy}) => {
    const {session} = useAuth();
    const {isLoading, isError, data, error} = useQuery(['tweets', session?.user?.id, userIdToFilterBy], fetchTweets);
    const onFavoriteToggle = () => {
    };

    if (isLoading) {
        return (
            <StyledContainer>
                <CircularProgress/>
            </StyledContainer>
        );
    }

    if (isError || !data) {
        return <StyledCard/>;
    }

    return (
        <>
            {
                data.tweets.map((tweet) => {
                    return (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet}
                            // f={false}
                            // f={tweet.isFavored}
                            userId={session?.user?.id}
                            onFavoriteToggle={onFavoriteToggle}
                        />
                    )
                })
            }
        </>
    );
};
