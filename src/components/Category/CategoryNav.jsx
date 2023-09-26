import { Link } from "react-router-dom";
import useNewsCategories from "../../hooks/useNewsCategories";

const CategoryNav = () => {
    const categories = useNewsCategories()
    return ( 
        <nav className="container mx-auto py-2">
            <div className="category-nav-container py-3 flex lg:flex-wrap justify-between bg-slate-50 rounded-sm overflow-x-auto lg:overflow-hidden">
                {categories.map((category, index) => (
                    <Link to={`/category/${category.news_category_name.toLowerCase()}`} key={index} className="category font-medium mx-2 w-max cursor-pointer transition-all hover:text-blue-600">
                        {category.news_category_name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default CategoryNav;