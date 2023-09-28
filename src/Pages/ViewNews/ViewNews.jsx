import { Link, useParams } from 'react-router-dom';
import useNewsPost from '../../hooks/useNewsPost';
import { FaCircleUser } from 'react-icons/fa6';
import { BiSend } from 'react-icons/Bi';
import { AiFillDislike, AiFillLike, AiOutlineComment } from 'react-icons/Ai';
import useNewsStats from '../../hooks/useNewsStats';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import deviceInfo from '../../utils/deviceInfo';
import useInteractions from '../../hooks/useInteractions';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useNewsComments from '../../hooks/useNewsComments';

const ViewNews = () => {
    const [axiosSecure] = useAxiosSecure();
    const news = useNewsPost();
    const { id } = useParams();
    const [interactions, interactionsRefetch] = useInteractions(id);
    const [newsStats, newsStatsRefetch] = useNewsStats(id);
    const newNews = news.find((n) => n.id == id);
    const [liked, setLiked] = useState(newsStats[0]?.likes === 1);
    const [disliked, setDisliked] = useState(newsStats[0]?.dislikes === 1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [__comments, __commentsRefetch] = useNewsComments(id);

    useEffect(() => {
        setComments(__comments);
    }, [id, __comments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const postData = {
                newsId: id,
                parentCommentId: replyTo,
                text: newComment,
            };

            await axiosSecure.post('/comments', postData);
            __commentsRefetch();
            toast.success('Commented!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setNewComment('');
            setReplyTo(null);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    const renderCommentsAndReplies = (comments, level = 0) => {
        return (
            <ul style={{ paddingLeft: `${level == 0 ? 0 : level + 10}px` }}>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <div className='border-l-2 pl-2 mb-2 rounded-md py-1 bg-slate-50'>
                            <span className='text-[11px] font-semibold text-gray-400'>{comment.created_at.split('T')[0]}</span>
                            <p>{comment.text}</p>
                            <button className=' text-blue-500 mt-1 font-bold text-[10px]' onClick={() => setReplyTo(comment.id)}>Reply</button>
                        </div>
                        {replyTo === comment.id && (
                            <form className='flex flex-col' onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                                <textarea
                                    className='border-2 p-1 w-72'
                                    placeholder="Write a reply"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <div>
                                    <button className='btn btn-xs btn-outline btn-info my-2 font-bold text-[10px]' type="submit">Submit Reply</button>
                                    <button className='btn btn-xs btn-outline btn-danger my-2 ml-2 font-bold text-[10px]' type="button" onClick={() => setReplyTo(null)}
                                    >Close</button>
                                </div>
                            </form>
                        )}
                        {comment?.replies?.length > 0 && renderCommentsAndReplies(comment.replies, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    const handleReplySubmit = async (e, parentCommentId) => {
        e.preventDefault();

        try {
            const postData = {
                newsId: id,
                parentCommentId,
                text: newComment,
            };

            await axiosSecure.post('/comments', postData);
            __commentsRefetch();
            toast.success('Replied!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setNewComment('');
            setReplyTo(null);
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };


    // =========================================================================
    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const [newsStatsResponse, interactionsResponse] = await Promise.all([
                    axiosSecure.get(`/newsStats/${id}/${deviceInfo}`),
                    axiosSecure.get(`/interactions/${id}`)
                ]);

                const newsStatsData = newsStatsResponse.data;
                const interactionsData = interactionsResponse.data;

                setLiked(newsStatsData[0]?.likes === 1);
                setDisliked(newsStatsData[0]?.dislikes === 1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNewsData();
    }, [id, axiosSecure, deviceInfo]);

    const handleLikeClick = async (id) => {
        if (!liked) {
            try {
                const response = await axiosSecure.patch(`/likeIncrease/${id}`, { deviceInfo });
                if (response.status === 200) {
                    setLiked(true);
                    if (disliked) {
                        setDisliked(false);
                    }
                    interactionsRefetch();
                    newsStatsRefetch();
                } else {
                    console.error('Failed to like news');
                }
            } catch (error) {
                console.error('Error liking news:', error);
            }
        } else {
            try {
                const response = await axiosSecure.patch(`/likeDecrease/${id}`, { deviceInfo });
                if (response.status === 200) {
                    setLiked(false);
                    interactionsRefetch();
                    newsStatsRefetch();
                } else {
                    console.error('Failed to undo like');
                }
            } catch (error) {
                console.error('Error undoing like:', error);
            }
        }
    };

    const handleDislikeClick = async (id) => {
        if (!disliked) {
            try {
                const response = await axiosSecure.patch(`/dislikeIncrease/${id}`, { deviceInfo });
                if (response.status === 200) {
                    setDisliked(true);
                    if (liked) {
                        setLiked(false);
                    }
                    interactionsRefetch();
                    newsStatsRefetch();
                } else {
                    console.error('Failed to dislike news');
                }
            } catch (error) {
                console.error('Error disliking news:', error);
            }
        } else {
            try {
                const response = await axiosSecure.patch(`/dislikeDecrease/${id}`, { deviceInfo });
                if (response.status === 200) {
                    setDisliked(false);
                    interactionsRefetch();
                    newsStatsRefetch();
                } else {
                    console.error('Failed to undo dislike');
                }
            } catch (error) {
                console.error('Error undoing dislike:', error);
            }
        }
    };

    if (!newNews) {
        return <div>News not found</div>;
    }

    return (
        <>
            <div className="container mx-auto my-10 px-3 lg:px-0">
                <div className=''>
                    <h1 className='font-bold capitalize mb-6 lg:text-3xl'>{newNews.title}</h1>
                    <div className='text-slate-400 mb-6'>
                        <p className='mb-2 text-lg flex items-center text-slate-500'><FaCircleUser className='mt-[2px]'></FaCircleUser><span className='ml-2'>{newNews.author_name}</span> <span className='text-sm mr-1 ml-4 mt-[1px]'>{new Date(newNews.publish_date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}</span></p>
                        <p><span className='inline-block mr-2'>{interactions[0]?.totalViews} Views </span></p>
                        <Link to={`/category/${newNews.news_category_name.toLowerCase()}`} className='font-medium text-slate-600 bg-green-100 px-1 py-1 inline-block mt-3 mb-2 text-sm rounded-md'>{newNews.news_category_name}</Link>

                        <p>{newNews.news_tags.split(',').map((nt, index) => (<Link to={`/tag/${nt}`} key={index} className='text-xs mr-2 bg-green-100 text-gray-600 px-2 py-[3px] rounded-full'>{nt}</Link>))}</p>
                    </div>
                </div>
                {
                    newNews.content ?
                        <>
                            <div dangerouslySetInnerHTML={{ __html: newNews.content }} />

                            <div className='mt-4 border-t-2 pt-4'>
                                <button
                                    className={`bg-slate-100 py-1 px-2 mr-2 rounded-sm ${liked ? 'text-blue-500' : ''}`}
                                    onClick={() => handleLikeClick(newNews.id)}
                                    disabled={disliked} title='Like'
                                >
                                    <AiFillLike className='inline-block mb-1' /> {interactions[0]?.totalLikes}
                                </button>
                                <button
                                    className={`bg-slate-100 py-1 px-2 rounded-sm ${disliked ? 'text-red-500' : ''}`}
                                    onClick={() => handleDislikeClick(newNews.id)}
                                    disabled={liked} title='Dislike'
                                >
                                    <AiFillDislike className='inline-block' /> {interactions[0]?.totalDislikes}
                                </button>
                                <button className='bg-slate-100 py-1 px-2 rounded-sm ml-2'><AiOutlineComment className='inline-block mb-1 mr-1'></AiOutlineComment>{comments[0]?.count}</button>
                            </div>
                        </>
                        :
                        <><p>No Content Available</p></>
                }
                <div>
                    <form onSubmit={handleCommentSubmit}>
                        <div className="mt-5">
                            <textarea placeholder="Write a Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} name="newsComment" className={`input input-bordered rounded-sm input-sm w-full h-20 ${replyTo ? 'hidden' : ''}`} required  ></textarea>
                        </div>
                        <button type='submit' className='btn btn-outline btn-success btn-xs text-xs'>Comment <BiSend className='inline-block'></BiSend></button>
                    </form>
                    <div>
                        <h2 className='font-semibold my-4 pb-1 border-b-2'>Comments:</h2>
                        {renderCommentsAndReplies(comments)}
                        {/* Render comments and replies recursively */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ViewNews;


