import {QueryFunction} from "react-query";
import {SupabaseClient} from "./SupabaseClient";
import {AVATAR_BUCKET} from "./Database";

export const FetchAvatar: QueryFunction<string | undefined> = async ({queryKey}) => {
    const path = queryKey.at(1) as string;
    const {data, error} = await SupabaseClient.storage
        .from(AVATAR_BUCKET)
        .download(path);

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        return undefined;
    }

    return URL.createObjectURL(data);
};
