import React from 'react'
import {CircularProgress, styled} from "@mui/material";

const StyledContainer = styled("div")({
    padding: "6em 0 6em 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const PageLoading = () => {
    return (
        <StyledContainer>
            <CircularProgress/>
        </StyledContainer>
    );
};
