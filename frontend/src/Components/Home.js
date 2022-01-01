import BlogsList from './BlogList';
import Create from './Create';

const Home = ({isLoggedIn, blogsData, profileData}) => {
    return(
        <div className="home">
            {isLoggedIn && <Create isLoggedIn={isLoggedIn} />}
            {blogsData && <BlogsList blogs={blogsData} profileData={profileData} />}
        </div>
    );
}
export default Home;