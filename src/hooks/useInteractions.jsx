import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useInteractions = (newsId) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: interactions = [], refetch: interactionsRefetch} = useQuery(['interactions'], async () => {
        const res = await axiosSecure.get(`/interactions/${newsId}`);
        return res.data;
    });
    return [interactions, interactionsRefetch];
};

export default useInteractions;