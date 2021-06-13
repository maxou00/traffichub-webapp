import { useRouter } from "next/router";
import React from "react";
import { useAuthProfile } from "./AuthContext";

export function Protected(props: React.PropsWithChildren<{}>) {
    const router = useRouter();
    const profile = useAuthProfile();
    React.useEffect(() => {
        if(!profile) {
            router.replace("/auth/login");
        }
    }, [profile]);

    return <>
        {
            props.children
        }
    </>
}