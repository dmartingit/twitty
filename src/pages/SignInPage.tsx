import React from "react";
import {useForm} from "react-hook-form";
import {SupabaseClient} from "../api/SupabaseClient";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Button, Link, Paper, styled, TextField, Typography} from "@mui/material";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const StyledPaper = styled(Paper)({
    marginTop: "5em",
    padding: "6em 0 6em 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const StyledForm = styled("form")({
    width: 300,
    margin: "2em 0 0 0",
    "& > div": {
        margin: "0.6em 0 0.6em 0"
    },
});


export const SignInPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const redirectUri = new URLSearchParams(window.location.search).get("redirectUri");
    const onSubmit = async ({email, password}: any) => {
        const {error} = await SupabaseClient.auth.signIn({
            email,
            password,
        });
        if (error) {
            console.error(error);
            return;
        }

        navigate(redirectUri || "/");
    };

    return (
        <StyledPaper>
            <Typography variant="h5" align="center">
                Sign in to Twitty
            </Typography>
            <StyledForm onSubmit={(e) => e.preventDefault()}>
                <div>
                    <TextField
                        {...register("email", {required: "Email is required", pattern: emailRegex,})}
                        name="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message?.toString()}
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        {...register("password", {required: "Password is required"})}
                        name="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message?.toString()}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                    />
                </div>

                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    fullWidth
                >
                    Sign In
                </Button>

                <Link
                    underline="none"
                    to="/signup"
                    component={RouterLink}
                    color="inherit"
                >
                    <Button>
                        Sign Up
                    </Button>
                </Link>
            </StyledForm>
        </StyledPaper>
    );
};
