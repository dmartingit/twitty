import React from "react";
import {Alert, Button, styled} from "@mui/material";

const StyledAlert = styled(Alert)({
    margin: "1.5em 0 0.25em 0",
});

type NewTweetAlertProps = {
    newTweetAvailable: boolean;
    fetchNewTweets: () => void;
};

export const NewTweetAlert: React.FC<NewTweetAlertProps> = ({newTweetAvailable, fetchNewTweets}) => {
    const action = (
        <Button color="primary" size="small" onClick={fetchNewTweets}>
            Refresh
        </Button>
    );

    if (!newTweetAvailable) {
        return null;
    }

    return (
        <StyledAlert severity="info" action={action}>
            New tweets available
        </StyledAlert>
    );
};