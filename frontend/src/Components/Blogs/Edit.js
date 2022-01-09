import { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

const Edit = ({isLoggedIn, blogsData}) => {
  const history = useHistory();
  const { id } = useParams();

  if(!isLoggedIn){
    history.push('/login');
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
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(blog.image);
  const author = localStorage.getItem('user_id');


  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', image, image.name);
    form_data.append('title', title);
    form_data.append('description', description);
    form_data.append('author', author);
    
    fetch('/api/blogs/', {
      method: 'PUT',
      headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    },
      body: form_data
    }).then(res => {
              console.log(res.data);
            })
    .catch(err => console.log(err));
    history.go(-1)
  }

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
              {imageUrl!=null && <img src={imageUrl}/>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
 
export default Edit;