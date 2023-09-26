
import AllNews from "../../components/News/AllNews";
import LatestNews from "../../components/News/LatestNews";
import useNewsPost from "../../hooks/useNewsPost";
import CategoryNav from "../../components/Category/CategoryNav";
import AllTags from "../../components/Category/AllTags";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Home = () => {
    const news = useNewsPost();
    const [__news, __setNews] = useState([]);
    const  {category_name} = useParams();
    const  {tag_name} = useParams();
    
    //===============================================
    useEffect(()=>{
        __setNews(news)
    },[news])
    //===============================================
    const handleNewsByCategory = (categoryName) => {
        if (categoryName == 'all') {
            __setNews(news);
        } else {
            const filteredNewsByCateory = news.filter(_news => _news.news_category_name.toLowerCase() == categoryName.toLowerCase());
            __setNews(filteredNewsByCateory);
        }
    }
    useEffect(()=>{
        if (category_name){
            handleNewsByCategory(category_name);
        }
        else{
            __setNews(news);
        }
    },[category_name])
    //===============================================
    const handleNewsByTags = (tagName) => {
        if (tagName == "all") {
            __setNews(news);
        } else {
            const filteredNewsByTag = news.filter(_news => _news.news_tags.toLowerCase().includes(tagName.toLowerCase()))
            __setNews(filteredNewsByTag);
        }
    }
    useEffect(()=>{
        if (tag_name){
            handleNewsByTags(tag_name);
        }
        else{
            __setNews(news);
        }
    },[tag_name])
    //===============================================
    const handleNewsSearch = e => {
        const searchString = e.target.value;
        const searchedNews = news.filter(_news => _news.title.toLowerCase().includes(searchString.toLowerCase()));
        __setNews(searchedNews);
    }
    //===============================================

    return (
        <>
            <CategoryNav></CategoryNav>
            <div className="container mx-auto mt-5">
                <div className="flex flex-col md:flex-row gap-4 px-3 lg:px-0">
                    <AllTags handleNewsByTags={handleNewsByTags}></AllTags>
                    <AllNews __news={__news} handleNewsSearch={handleNewsSearch}></AllNews>
                    <LatestNews></LatestNews>
                </div>
            </div>
        </>
    );
};

export default Home;