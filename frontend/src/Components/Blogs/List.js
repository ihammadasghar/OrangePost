import { Link } from 'react-router-dom';
import defaultPicture from '../Static/defaultPicture.png'

const List = ({blogs}) => {

    return(
        <div className="blog-list">
        {blogs.map((blog) => (
            <div className="blog-preview" key={ blog.id }>
                <Link to={`/blogs/${blog.id}`}>
                    <table>
                        <tr>
                            {blog.image &&(
                                <td>
                                    <img className='post-image-preview' src={blog.image}/>
                                 </td>
                            ) }
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <img className='profile-picture' src={defaultPicture}/>
                                        </td>
                                        <td>
                                            <h2>{ blog.title } </h2>
                                            <p>Written By { blog.author }</p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p>{blog.description}</p>
                            </td>
                        </tr>
                        
                    </table>
                    
                </Link>
            </div>
            
        ))
        }
        </div>
    );
}
export default List;