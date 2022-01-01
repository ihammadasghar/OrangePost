import { Link } from 'react-router-dom';
import thread from './Static/thread.png';

const CommentList = ({comments}) => {
    // const [commentList, setCommentList] = useState(comments);
    // setCommentList(comments.sort((a,b)=>(b.likes-a.likes)));
    // const handlefilter = (f) => {
    //     switch(f) {
    //         case "Most Popular":
    //           setCommentList(comments.sort((a,b)=>(b.likes-a.likes)));
    //           break;
    //         case "Oldest First":
    //             setCommentList(comments.sort((a,b)=>(new Date(a.created) - new Date(b.created))));
    //           break;
    //         case "Newest First":
    //             setCommentList(comments.sort((a,b)=>(new Date(b.created) - new Date(a.created))));
    //           break;
    //         default:
    //           // code block
    //       }
    //   }
    return(
        <div className="comment-list">
            {/* <select className="filter" > 
                <option value="Most Popular">Most Popular</option>
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
            </select> */}
        {comments.map((comment) => (
           <div className="comment-preview" key={ comment.id }>
               <table>
                   <tr>
                        <td >
                            <div className="thread-image" ></div>
                       </td>
                       <td>
                       <Link to={`/comments/${comment.id}`}>
                            <p>
                            <span> { comment.author } {comment.reply_to && <span>replied:</span>}{!comment.reply_to && <span>commented:</span>} </span>
                                { comment.text }
                            </p>
                        </Link>
                       </td>
                    </tr>
                </table>
                
            </div>
            
        ))
        }
        </div>
    );
}
export default CommentList;