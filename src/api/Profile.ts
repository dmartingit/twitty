import {definitions} from "./Types";
import {SupabaseClient} from "./SupabaseClient";
import {PROFILES_TABLE} from "./Database";

export type Profile = definitions["profiles"];

export const fetchProfileById = async (userId: string) => {
    const {data, error} = await SupabaseClient.from<Profile>(PROFILES_TABLE)
        .select("*")
        .eq("id", userId);

    if (error) {
        throw error;
    }
    if (!data || !data.length) {
        throw new Error(`No user with id ${userId}`);
    }

    return data[0];
};

export const fetchProfileByUsername = async (username: string) => {
    const {data, error} = await SupabaseClient.from<Profile>(PROFILES_TABLE)
        .select("*")
        .eq("username", username);

    if (error) {
        throw error;
    }
    if (!data || !data.length) {
        throw new Error(`No user with username ${username}`);
    }

    return data[0];
};