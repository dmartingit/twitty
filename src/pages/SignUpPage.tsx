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

export const SignUpPage = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const password = watch("password");
    const navigate = useNavigate();
    const onSubmit = ({email, password}: any) => {
        SupabaseClient.auth.signUp({
            email,
            password
        }).then(() => {
            navigate(`/confirm-signup?email=${encodeURIComponent(email)}`);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <StyledPaper>
            <Typography variant="h5" align="center">
                Sign up to Twitty
            </Typography>
            <StyledForm onSubmit={e => e.preventDefault()}>
                <div>
                    <TextField
                        {...register("email", {required: "Email is required", pattern: emailRegex})}
                        name="email"
                        error={!!errors.email}
                        helperText={errors.email?.message?.toString()}
                        label="Email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        {...register("password", {
                            required: "Password is required", minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                        name="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message?.toString()}
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        {...register("passwordConfirm", {validate: value => value === password || "The passwords do not match"})}
                        name="passwordConfirm"
                        error={!!errors.passwordConfirm}
                        helperText={errors?.passwordConfirm?.message?.toString()}
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                    />
                </div>

                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    size="large"
                >
                    Sign up
                </Button>
                <Link
                    underline="none"
                    to="/sign-in"
                    component={RouterLink}
                    color="inherit"
                >
                    <Button>
                        Sign In
                    </Button>
                </Link>
            </StyledForm>
        </StyledPaper>
    );
};
