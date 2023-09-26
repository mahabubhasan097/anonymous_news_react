import { Link } from 'react-router-dom';

const Navbar = () => {

    const navMenu = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/post'>New Post</Link></li>
    </>;

    return (
        <header className="shadow shadow-slate-300">
            <nav className="navbar bg-base-100 container mx-auto px-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navMenu
                            }
                        </ul>
                    </div>
                    <Link to='/' className="normal-case md:text-xl font-bold"> Anonymous<span className='text-blue-700'>News</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex lg:ms-auto">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navMenu
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;