import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNewsComments = (id) => {
    const [axiosSecure] = useAxiosSecure();
    const { data: __comments = [], refetch: __commentsRefetch } = useQuery(['__comments'], async () => {
        const res = await axiosSecure.get(`/comments/${id}`);
        return res.data;
    });
    return [__comments, __commentsRefetch];
};

export default useNewsComments;