import { useMainStore } from "@/store/MainStore/mainStore";
import { useUsersStore } from "@/store/usersStore";
import { useEffect } from "react";

export function useUserStore() {
    const { setLoader } = useMainStore()
    const { getUsers, users } = useUsersStore()
    useEffect(() => {
        setLoader(true)
        getUsers().then(() =>
            setLoader(false)
        ).catch(() => setLoader(false))
    }, [])
    return { users }
}