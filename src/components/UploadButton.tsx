import React, { ChangeEventHandler } from "react";
import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export type UploadButtonProps = {
    onUpload: ChangeEventHandler<HTMLInputElement>;
    isLoading?: boolean;
    className?: string;
    avatarUrl?: string;
};

export const UploadButton = ({
                                 onUpload,
                                 isLoading,
                                 className,
                                 avatarUrl,
                             }: UploadButtonProps) => {
    return (
        <div>
            {avatarUrl ? <img src={avatarUrl} alt={"Avatar"}/> : null}
            <Button
                className={className}
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
            >
                Upload Avatar
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    disabled={isLoading}
                />
            </Button>
        </div>
    );
};
