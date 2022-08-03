import React from "react";
import {Button, CircularProgress, styled} from "@mui/material";

// const useStyles = styled(() => ({
//         container: {
//             marginTop: '2em',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//         },
//     })
// );

const StyledContainer = styled("div")({
    marginTop: '2em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

type FetchOlderTweetsButtonProps = {
    hasPreviousPage?: boolean;
    isLoading?: boolean;
    fetchOlderTweets: () => void;
}

export const FetchOlderTweetsButton: React.FC<FetchOlderTweetsButtonProps> = ({
                                                                                  hasPreviousPage,
                                                                                  fetchOlderTweets,
                                                                                  isLoading,
                                                                              }) => {
    const renderContent = () => {
        switch (true) {
            case !hasPreviousPage:
                return <span>You are all caught up!</span>;
            case isLoading:
                return <CircularProgress/>;
            default:
                return (
                    <Button color="primary" size="small" onClick={fetchOlderTweets}>
                        Fetch more tweets!
                    </Button>
                );
        }
    };

    return (
        <StyledContainer>
            {renderContent()}
        </StyledContainer>
    );
};
