import { FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import deviceInfo from '../../utils/deviceInfo';
const AllNews = ({ __news, handleNewsSearch }) => {
    const [axiosSecure] = useAxiosSecure();
    const handleNewsStats = (id) => {
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
        <div className="flex-[3]">
            <div className='border-b-2 border-gray-300 mb-8 bg-slate-50'>
                <input type="text" name='searchNews' placeholder="Search News" className="input bg-transparent input-sm w-full" onChange={handleNewsSearch}/>
            </div>
            <div>
                <h3 className="font-semibold mb-5">All News</h3>
            </div>

            {/* card start */}
            {
                __news.map((_news) => (
                    <Link onClick={() => handleNewsStats(_news.id)} to={`/viewNews/${_news.id}/${_news.title}`} key={_news.id} className="flex mb-4 cursor-pointer">
                        <div className='w-28 lg:w-52'>
                            <img className="rounded-sm h-20 lg:h-32" src={_news.thumbnail} alt="anonymous news" />
                        </div>
                        <div className="ml-3 flex flex-col justify-center flex-1">
                            <div className='text-slate-400 mb-2 text-sm lg:text-base'>
                                <FaCircleUser className='inline-block mb-[2px]'></FaCircleUser><span className='ml-2'>{_news.author_name}</span>
                            </div>
                            <h2 className="text-sm lg:text-xl font-semibold capitalize">{_news.title}</h2>
                            <p className="text-sm text-slate-500">{_news.sub_title}</p>
                            <div className='mt-2'>
                                <span className='text-xs md:text-sm bg-slate-100 px-2 rounded-full mr-2'>{new Date(_news.publish_date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short', // or 'short' for abbreviated month name
                                    day: 'numeric',
                                })}</span>
                                <Link to={`/viewNews/${_news.id}/${_news.title}`} className='text-white border-2 bg-blue-600 px-3 py-1 rounded-md text-xs'>Read...</Link>
                            </div>
                        </div>
                    </Link>
                ))
            }
            {/* card end */}
        </div>
    );
};

export default AllNews;