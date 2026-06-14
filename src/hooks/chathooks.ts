import {useMutation} from "@tanstack/react-query";
import {getChatResponse} from "../services/chatService";
import { useAuth0 } from "@auth0/auth0-react";


export const useAskMutation = () =>{
    const { getAccessTokenSilently } = useAuth0();
    return useMutation({
        mutationFn: async (query: string) => {
            const token = await getAccessTokenSilently();
            return getChatResponse(query, token);
        },
        onError: (error) => {
            console.log(error);
        }
    })
}