import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link as RouterLink} from "react-router-dom";
import {Button, Link, styled, TextField} from "@mui/material";

const FormComponent = styled("form")({
    width: 300,
    margin: "2em 0 0 0",
    "& > div": {
        margin: "0.6em 0 0.6em 0",
    },
});

export type ProfileInput = {
    username: string
    website?: string
};

export type ProfileFormProps = {
    onSubmit: SubmitHandler<ProfileInput>;
    isSubmitting: boolean;
    username?: string;
    website?: string;
    usernameExists: boolean;
    className?: string;
    submitText?: string;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
                                                            onSubmit,
                                                            isSubmitting,
                                                            username,
                                                            website,
                                                            usernameExists,
                                                            className,
                                                            submitText
                                                        }) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ProfileInput>();

    return (
        <FormComponent onSubmit={(e) => e.preventDefault()}>
            <div>
                <TextField
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be longer than 2 letters",
                        },
                    })}
                    name="username"
                    error={!!errors.username || usernameExists}
                    helperText={errors?.username?.message?.toString() || (usernameExists && "The username already exists")}
                    label="Username"
                    type="text"
                    autoComplete="username"
                    fullWidth
                    defaultValue={username}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <TextField
                    {...register("website")}
                    name="website"
                    label="Website"
                    type="website"
                    autoComplete="website"
                    fullWidth
                    defaultValue={website}
                    disabled={isSubmitting}
                />
            </div>

            <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >
                {submitText ?? "Submit"}
            </Button>
            <Link
                underline="none"
                to="/profile"
                component={RouterLink}
                color="inherit"
            >
                <Button>
                    Cancel
                </Button>
            </Link>
        </FormComponent>
    );
};
