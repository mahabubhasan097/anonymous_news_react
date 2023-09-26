import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from "jodit-react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useNewsCategories from '../../hooks/useNewsCategories';
import useNewsTags from '../../hooks/useNewsTags';
import CreatableSelect from 'react-select/creatable';
import { useEffect } from 'react';
const Post = () => {
    const [postContent, setPostContent] = useState('');
    const newsCategories = useNewsCategories();
    const [axiosSecure] = useAxiosSecure();
    const queryClient = useQueryClient();
    const newstags = useNewsTags();
    // console.log(newtags);
    const modifiedNewsTags = newstags.map(newstag => ({value: newstag.news_tag_id, label: newstag.news_tag_name }));
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    useEffect(()=>{
        setTagOptions(modifiedNewsTags);
    },[])

    const handleChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
    };


    const createPostMutation = useMutation(
        async (postNews) => {
            const res = await axiosSecure.post('/news', postNews);
            return res.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('news');
            },
        }
    );

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const subTitle = form.subTitle.value;
        const author = form.author.value;
        const category = parseInt(form.category.value);
        const thumbnail = form.thumbnail.value;
        const publishDate = new Date().toLocaleString();
        const postNews = {
            title,
            subTitle,
            author,
            postContent,
            category,
            thumbnail,
            publishDate,
            selectedTags
        };

        try {
            await createPostMutation.mutateAsync(postNews);
            toast.success('News Posted!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setPostContent('');
            form.reset();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <>
            <section className="container mx-auto my-10 px-3 lg:px-0">
                <div className="text-center">
                    <h1 className="font-semibold text-lg md:text-3xl capitalize">- Create a new post -</h1>
                </div>
                <div className="mt-5">
                    <form onSubmit={handlePostSubmit}>

                        <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                            <div className="flex-1">
                                <label className="inline-block my-1 md:my-2 font-medium">Title </label>
                                <input type="text" placeholder="Enter title" name="title" className="input input-bordered input-sm w-full" required />
                            </div>
                            <div className="flex-1">
                                <label className="inline-block my-1 md:my-2 font-medium">Sub Title</label>
                                <input type="text" placeholder="Enter sub title" name="subTitle" className="input input-bordered input-sm w-full" required />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
                            <div className="flex-1">
                                <label className="inline-block my-1 md:my-2 font-medium">Category</label>
                                <select name="category" className="select select-bordered select-sm w-full" required>
                                    <option selected disabled>Select Category</option>
                                    {
                                        newsCategories.map(newsCategory => (<option key={newsCategory.news_category_id} value={newsCategory.news_category_id}>{newsCategory.news_category_name}</option>))
                                    }
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="inline-block my-1 md:my-2 font-medium">Thumbnail</label>
                                <input type="text" placeholder="Provide photo url" name="thumbnail" className="input input-bordered input-sm w-full" required />
                            </div>
                            <div className="flex-1">
                                <label className="inline-block my-1 md:my-2 font-medium">Author</label>
                                <input type="text" placeholder="Enter your name" name="author" className="input input-bordered input-sm w-full" required />
                            </div>
                        </div>

                        <div>
                            <div className="">
                                <label className="inline-block my-1 md:my-2 font-medium">Tags </label>
                                <CreatableSelect
                                    isMulti
                                    options={tagOptions}
                                    value={selectedTags}
                                    onChange={handleChange}
                                    placeholder="Select tags..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="inline-block my-2 font-medium">Post Content</label>
                            <JoditEditor value={postContent} onChange={(newContent) => setPostContent(newContent)}></JoditEditor>

                        </div>
                        <div className="mt-7">
                            <button className="btn btn-sm btn-outline btn-success" type="submit">Create Post</button>
                        </div>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>

    );
};

export default Post;