import { useMainStore } from "@/store/MainStore/mainStore";
import { useParticipantsStore } from "@/store/participantsStore";
import { useEffect } from "react";

export function useParticipantStore() {
    const { setLoader } = useMainStore()
    const { participants, getParticipants } = useParticipantsStore()
    useEffect(() => {
        setLoader(true)
        getParticipants().then(() =>
            setLoader(false)
        ).catch(() => setLoader(false))
    }, [])
    return { participants }
}