import React from "react"
import {Card, CardActions, CardContent, CardHeader, IconButton, styled, Typography} from "@mui/material";
import {Tweet} from "../api/Tweet"
import {UserAvatar} from "./UserAvatar"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import dayjs from "dayjs";

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const StyledCard = styled(Card)({
    margin: "0.3em 0 0.3em 0",
    display: 'flex',
    flexDirection: 'column',
});

export type TweetCardProps = {
    tweet: Tweet,
    onFavoriteToggle: (tweetId: number, userId?: string) => void
    userId?: string
};

export const TweetCard: React.FC<TweetCardProps> = ({tweet, onFavoriteToggle, userId}) => {
    const {id, author, favorites, isFavored, content, createdAt} = tweet;

    return (
        <StyledCard variant={"outlined"}>
            <CardHeader
                avatar={
                    <UserAvatar path={author.avatar_url} name={author.username}/>
                }
                title={author.username}
                subheader={(dayjs(createdAt) as any).fromNow()}
            />
            <CardContent>
                {content}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="toggle favorite for this tweet" onClick={() => onFavoriteToggle(id, userId)}>
                    {isFavored ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
                <Typography>
                    {favorites}
                </Typography>
            </CardActions>
        </StyledCard>
    );
};
