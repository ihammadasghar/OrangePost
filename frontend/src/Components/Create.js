import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Create = ({isLoggedIn}) => {
  const history = useHistory();
  if(!isLoggedIn){
    history.push('/login');
  }
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const author = localStorage.getItem('user_id');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', image, image.name);
    form_data.append('title', title);
    form_data.append('description', description);
    form_data.append('author', author);
    let url = 'http://127.0.0.1:8000/blogs/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
        window.location.reload();
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const blog = { title, description, author, image };

  //   fetch('http://127.0.0.1:8000/blogs/', {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json",
  //     Authorization: `Token ${localStorage.getItem('token')}`
  //   },
  //     body: JSON.stringify(blog)
  //   }).then(() => {
  //     // history.go(-1);
  //     history.push('/');
  //   })
  // }

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <input 
                type="text"
                placeholder="Title"
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
            <td>
            <div class="upload-btn-wrapper">
              <button class="btn">Upload Image</button>
              <input 
                  type="file" name="myfile"  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                  
                  }}
                />
            </div>
            </td>
            </tr>
            
        </table>
        <textarea
                required
                placeholder="What's on your mind?" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {image!=null && <img src={imageUrl}/>}
        <button>Post</button>
      </form>
    </div>
  );
}
 
export default Create;