import dayjs from "dayjs";
import {QueryFunction} from "react-query";
import {SupabaseClient} from "./SupabaseClient";
import {definitions} from "./Types";
import {TWEETS_TABLE} from "./Database";
import {Profile} from "./Profile";

type TweetServerResponse = {
    id: number
    content: string
    created_at: string,
    favored_users: { id: string, username: string }[]
    tweet_author: definitions["profiles"]
};

export type Tweet = {
    id: number
    isFavored: boolean
    favorites: number
    favoredBy: definitions["profiles"][]
    author: definitions["profiles"]
    createdAt: string
    content: string
    hasBeenAddedByMutate?: boolean
};

export type RawTweet = {
    id: number,
    created_at: string,
    content: string
    user_id: string,
};

export type AddTweetRequestBody = {
    user_id: string
    content: string
};

export type TweetResponse = {
    tweets: Tweet[]
    next?: string
    previous?: string
};

export const fetchTweets: QueryFunction<TweetResponse, [string, string | undefined, string | undefined]> = async ({
                                                                                                                      queryKey,
                                                                                                                      pageParam
                                                                                                                  }) => {
    const loggedInUserId = queryKey.at(1);
    const userIdToFilterTweetsBy = queryKey.at(2);
    const {to, from} = pageParam || {};

    const params = {
        u_id: userIdToFilterTweetsBy || null,
        t_from: from,
        t_to: to
    };

    const ascending = !!from;

    const query = SupabaseClient
        .rpc<TweetServerResponse>('get_tweets', params)
        .order("created_at", {ascending})
        .limit(20);

    let {data, error} = await query;

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        return {tweets: []};
    }

    let output: TweetResponse = {
        tweets: data.map(fromResponseToTweet(loggedInUserId as string | undefined)),
    };

    if (data.length) {
        if (!to && !from) {
            output.next = data[0].created_at;
            output.previous = data[data.length - 1].created_at;
        }

        if (to && !from) {
            output.previous = data[data.length - 1].created_at;
        }

        if (from && !to) {
            output.next = data[0].created_at;
        }
    }

    return output;
}

const fromResponseToTweet = (loggedInUserId?: string,) => (response: TweetServerResponse): Tweet => {
    const {id, content, created_at, favored_users, tweet_author} = response;
    return {
        id,
        content,
        createdAt: created_at,
        favoredBy: favored_users,
        author: tweet_author,
        isFavored: favored_users?.findIndex(u => u.id === loggedInUserId) > -1,
        favorites: favored_users ? favored_users.length : 0
    }
}

export const fromRawTweetToTweet = (rawTweet: RawTweet, user: Profile) => {
    const {created_at, content, id} = rawTweet;
    return {
        id,
        content,
        createdAt: dayjs(created_at).format("DD MMM"),
        favoredBy: [],
        author: user,
        isFavored: false,
        favorites: 0
    };
};

// export const fromTweetRequestToTweet = (rawTweet: AddTweetRequestBody, user: Profile) => {
//     const {content, id} = rawTweet;
//     return {
//         id,
//         content,
//         createdAt: dayjs().format("DD MMM HH:MM"),
//         favoredBy: [],
//         author: user,
//         isFavored: false,
//         favorites: 0,
//         hasBeenAddedByMutate: true
//     };
// };

export const createTweet = async (tweet: AddTweetRequestBody) => {
    const {data, error} = await SupabaseClient
        .from<RawTweet>(TWEETS_TABLE)
        .insert(tweet);

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};
