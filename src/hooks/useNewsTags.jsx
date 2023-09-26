import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNewsTags = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: newsTags = []} = useQuery(['newsTags'], async () => {
        const res = await axiosSecure.get('/newsTags');
        return res.data;
    });
    return newsTags;
};

export default useNewsTags;