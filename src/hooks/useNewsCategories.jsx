import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useNewsCategories = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: newsCategories = []} = useQuery(['newsCategories'], async () => {
        const res = await axiosSecure.get('/newsCategories');
        return res.data;
    });
    return newsCategories;
}
export default useNewsCategories;