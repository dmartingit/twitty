import {SupabaseClient} from "./SupabaseClient";

export const toggleFavorite = async (u_id: string, t_id: number) => {
    const {error} = await SupabaseClient.rpc('toggle_favorite', {u_id, t_id});
    if (error) {
        throw error;
    }

    return true;
}

export const getFavoriteByIds = async (ids: number[]) => {
    const {data, error} = await SupabaseClient.rpc('get_favored_tweets_by_id', {f_ids: ids})
    if (error) {
        throw error;
    }

    return data;
};
