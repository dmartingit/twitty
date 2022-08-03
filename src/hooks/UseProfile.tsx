import {useState, useEffect} from 'react'
import {definitions} from '../api/Types';
import {SupabaseClient} from '../api/SupabaseClient';
import {PROFILES_TABLE} from "../api/Database";

type Profile = definitions["profiles"];
type ProfileResult = [Profile | null, { message: string } | null, boolean];

export const useProfile = (query: "id" | "username", id?: string): ProfileResult => {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState<Profile | null>(null);
    const [error, setError] = useState<{ message: string } | null>(null);

    useEffect(() => {
        const runPromise = async (id: string) => {
            setIsLoading(true);
            const {data, error} =
                await SupabaseClient.from<Profile>(PROFILES_TABLE)
                    .select("*")
                    .eq(query, id);

            if (error) {
                setError(error);
            }

            if (data && data.length) {
                setResult(data[0]);
            }

            setIsLoading(false);
        };

        if (id) {
            runPromise(id).then();
        }
    }, [query, id]);

    return [result, error, isLoading];
};
