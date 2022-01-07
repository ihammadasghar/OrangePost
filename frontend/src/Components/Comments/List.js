import { Link } from 'react-router-dom';
import thread from '../Static/thread.png';

const List = ({comments}) => {
    return(
        <div className="comment-list">
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
export default List;