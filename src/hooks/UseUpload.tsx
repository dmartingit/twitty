import {AuthSession} from "@supabase/supabase-js";
import {ChangeEvent, useState} from "react";
import {SupabaseClient} from "../api/SupabaseClient";
import {AVATAR_BUCKET} from "../api/Database";

type UploadCallback = (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
type Error = { message: string };
export type UseUploadResult = [UploadCallback, string | null, Error | null, boolean];

export const useUpload = (session: AuthSession | null): UseUploadResult => {
    const [loading, setLoading] = useState<boolean>(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<{ message: string } | null>(null);

    const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!session) {
            return;
        }

        if (!event.target.files || event.target.files.length === 0) {
            setError({message: "You must select an image to upload."});
            return;
        }

        setLoading(true);
        setError(null);
        setAvatarUrl(null);

        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${session?.user?.id}${Math.random()}.${fileExt}`;

        let {data, error} = await SupabaseClient.storage
            .from(AVATAR_BUCKET)
            .upload(filePath, file, {cacheControl: "3600"});

        if (error) {
            setError(error);
        } else {
            setAvatarUrl(getFilename((data as any).Key));
        }
        setLoading(false);
    };

    return [onUpload, avatarUrl, error, loading];
};

const getFilename = (key: string) => {
    const arr = key.split("/");
    if (arr.length < 2) {
        return key;
    }
    const [_, ...tail] = arr;
    return tail.join("/");
};
