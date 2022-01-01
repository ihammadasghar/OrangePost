import { Link } from 'react-router-dom';

const Navbar = ({isLoggedIn, logout}) => {
    return(
        <nav className="navbar">
            <h1>OrangePost</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                {isLoggedIn && <Link to="/profile">{localStorage.getItem('username')}</Link>}
                {isLoggedIn && <button className="logout" onClick={logout}>Logout</button>}
                {!isLoggedIn && <Link to="/login">Login</Link>}
            </div>
        </nav>
    );
}
export default Navbar;