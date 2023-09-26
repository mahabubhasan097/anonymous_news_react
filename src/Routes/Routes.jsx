import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Post from "../Pages/Post/Post";
import ViewNews from "../Pages/ViewNews/ViewNews";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/category/:category_name',
                element:<Home></Home>
            },
            {
                path:'/tag/:tag_name',
                element:<Home></Home>
            },
            {
                path:'/post',
                element:<Post></Post>
            },
            {
                path:'/viewNews/:id/:newsTitle',
                element:<ViewNews></ViewNews>
            }
            
        ]
    }
]);