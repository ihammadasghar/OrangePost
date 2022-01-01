import { useState } from "react";
import { useHistory } from "react-router-dom";

const Comment = ({blog_id, reply_to}) => {
  const [text, setText] = useState('');
  const author = localStorage.getItem('user_id');
  const history = useHistory();
  const blog = blog_id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = { text, author, blog, reply_to };

    fetch('http://127.0.0.1:8000/comments/', {
      method: 'POST',
      headers: { "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem('token')}`
    },
      body: JSON.stringify(comment)
    }).then(() => {
      // history.go(-1);
      window.location.reload();
    })
  }

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          placeholder="What's your opinion?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button>Comment</button>
      </form>
    </div>
  );
}
 
export default Comment;