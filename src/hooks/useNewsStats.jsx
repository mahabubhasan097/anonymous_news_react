import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import deviceInfo from "../utils/deviceInfo";

const useNewsStats = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: newsStats = [], refetch: newsStatsRefetch} = useQuery(['newsStats'], async () => {
        const res = await axiosSecure.get(`/newsStats/${id}/${deviceInfo}`, {deviceInfo});
        return res.data;
    });
    return [newsStats, newsStatsRefetch];
};

export default useNewsStats;