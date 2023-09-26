import { Link } from "react-router-dom";
import useNewsTags from "../../hooks/useNewsTags";

const AllTags = () => {
    const newsTags = useNewsTags();
    return (
        <div className="flex-1">
            <div>
                <h3 className="font-semibold mb-5">News Tags</h3>
            </div>
            <div className="menu menu-horizontal p-0 max-h-screen overflow-y-auto">
                <Link to={`/tag/${'all'}`} className="py-1 px-2 bg-slate-100 rounded-full mr-2 mb-2 cursor-pointer">All</Link>

                {
                    newsTags.map((newsTag) => (<Link to={`/tag/${newsTag.news_tag_name}`} key={newsTag.news_tag_id} className="py-1 px-2 bg-slate-100 rounded-full mr-2 mb-2 cursor-pointer">{newsTag.news_tag_name}</Link>))
                }
            </div>
        </div>
    );
};

export default AllTags;