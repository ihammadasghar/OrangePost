import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Edit = ({isLoggedIn}) => {
  const history = useHistory();
  const { id } = useParams();

  if(!isLoggedIn){
    history.push('/login');
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const author = localStorage.getItem('user_id');

  useEffect(()=>{
    getBlog();
  }, [])

  let getBlog = async() => {
    const { data } = await axios
    .get(`/api/blogs/${id}` ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .catch((err) => console.log(err));
    console.log(data);
    setTitle(data.title);
    setImage(data.image);
    setImageUrl(data.image);
    setDescription(data.description);
  }

  const updateBlog = async() => {
    let form_data = new FormData();
    form_data.append('title', title);
    form_data.append('description', description);
    form_data.append('author', author);

    if(image !== null) {
      form_data.append('image', image)
    }

    await axios(`/api/blogs/${id}` ,{
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      data: form_data
    }).then(response => {
        console.log(response.data);
        history.push("/");
    })
  }

  return (
    <div className="create">
      <form onSubmit={updateBlog}>
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
                  type="file" 
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
        <button>Update</button>
      </form>
    </div>
  );
}
 
export default Edit;