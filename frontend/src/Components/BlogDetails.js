import { Redirect, useHistory, useParams } from "react-router-dom";
import CommentList from './CommentList';
import Comment from './Comment';
import defaultPicture from './Static/defaultPicture.png'

const BlogDetails = ({isLoggedIn, blogsData, commentsData}) => {
  const history = useHistory();
  const { id } = useParams();
  if(!isLoggedIn){
    return <Redirect to="/login"/>
  }
    
    var blog = null;
    var isAuthor =false;
    if(blogsData != null){
      blog = blogsData.find((b)=>(b.id == id));
      if(localStorage.getItem('username') == blog.author){
        isAuthor = true;
      }else{
        isAuthor = false;
      }
    }

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE',
      Authorization: `Token ${localStorage.getItem('token')}`
    }).then(() => {
      history.push('/');
    }) 
  }
  var blogComments = null;
  if (commentsData!=null){
    blogComments = commentsData.filter((comment)=>(comment.blog == id)).filter((comment)=>(comment.reply_to == null));
  }
 

    return(
        <div>
            <div className="blog-details">
            { blog && (
                <article>
                <table>
                    <tr>
                        <td>
                            <img className='profile-picture' src={defaultPicture}/>
                        </td>
                        <td>
                            <h2>{ blog.title } </h2>
                            <p>Written By { blog.author }</p>
                            {isAuthor && <button onClick={handleClick}>Delete</button>}
                        </td>
                    </tr>
                </table>
                
                <div>{ blog.description }</div>
                <img class="post-image" src={blog.image}/>
                </article>
            )}
          </div>
          {isLoggedIn && <Comment blog_id={id}/>}
            {commentsData && <CommentList comments={blogComments} />}
            </div>  
                    
        
    );
}
export default BlogDetails;