import BlogsList from './Blogs/List';
import CreateBlog from './Blogs/Create';

const Home = ({isLoggedIn, blogsData, profileData}) => {
    return(
        <div className="home">
            {isLoggedIn && <CreateBlog isLoggedIn={isLoggedIn} />}
            {blogsData && <BlogsList blogs={blogsData} profileData={profileData} />}
        </div>
    );
}
export default Home;