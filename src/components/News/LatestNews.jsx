import useAxiosSecure from "../../hooks/useAxiosSecure";
import useNewsPost from "../../hooks/useNewsPost";
import { Link } from "react-router-dom";
import deviceInfo from '../../utils/deviceInfo';
const LatestNews = () => {
    const news = useNewsPost();
    const topThreeNews = news.slice(0, 3);
    const [axiosSecure] = useAxiosSecure();
    const handleNewsStats = id => {
        const newsStats = {
            newsId: id,
            deviceInfo
        }
        axiosSecure.post(`/newsStats/${id}`, newsStats)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })

    }
    return (
        <div className="flex-1">
            <div>
                <h3 className="font-semibold mb-5">Popular News</h3>
            </div>
            {
                topThreeNews.map((n) => (
                    <Link onClick={()=>handleNewsStats(n.id)} to={`/viewNews/${n.id}/${n.title}`} key={n.id} className="cursor-pointer">
                        <div className="flex md:flex-col lg:flex-row mb-5">
                            <div>
                                <img src={n.thumbnail} alt="" className="w-20 h-14 rounded-sm" />
                            </div>
                            <div className="flex-1 ml-1">
                                <h3 className="font-semibold text-[12px]">{n.title}</h3>
                                <p><span className="text-[11px] mr-2 text-green-500 font-medium">{n.news_category_name}</span><span className="text-[11px]">{new Date(n.publish_date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}</span></p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default LatestNews;