import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNewsPost = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: news = []} = useQuery(['news'], async () => {
        const res = await axiosSecure.get('/news');
        return res.data;
    });
    return news;
};

export default useNewsPost;