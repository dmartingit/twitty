import React from "react";
import {SupabaseClient} from "../api/SupabaseClient";

export const HomePage = () => {
    const session = SupabaseClient.auth.session();

    return (
        <div>
            {session && `you are logged in as ${session?.user?.email}`}
            {!session && "you are not logged in"}
        </div>
    );
};
