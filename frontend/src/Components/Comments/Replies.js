import { useParams, useHistory, Redirect } from "react-router-dom";
import CommentList from './List';
import CreateComment from './Create';

const Replies = ({isLoggedIn, commentsData}) => {
    const history = useHistory();
    const { id } = useParams();
    if(!isLoggedIn){
      return <Redirect to="/login"/>
    }
    var comment = null;
    var blog_id = null;
    if(commentsData !=null){
        comment =  commentsData.find((b)=>(b.id == id));
        blog_id = comment.blog;
    }

  const deleteComment= () => {
    fetch('/api/comments/' + comment.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }
  var commentReplies = null;
  if(commentsData != null){
    commentReplies = commentsData.filter((reply)=>(reply.reply_to == id ));
  }
    return(
        <div className="comment_details">
            { comment && (
                <div className="comment-preview" key={ comment.id }>
                <p>
                     <span> { comment.author } commented: </span>
                    { comment.text }
                </p>
                </div>
            )}
            {isLoggedIn  && <CreateComment blog_id={blog_id} reply_to={id}/>}
            {commentsData && <CommentList comments={commentReplies} title="Replies" />}
            
                    
        </div>
    );
}
export default Replies;