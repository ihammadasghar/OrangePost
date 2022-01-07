import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({loginToggle}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const user = { username, password };
    const abortCont = new AbortController();
    fetch('/api/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }, { signal: abortCont.signal })
      .then(res => {
        if(!res.ok){
          throw Error('Not found link');
        }
        return res.json();
    })
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user_id', json.user_id);
        localStorage.setItem('username', json.username);
        loginToggle();
        history.go(-1);
      })
      .catch(err => {
        if(err.name === 'AbortError'){
            console.log('Fetch Aborted');
        }
        else{
            setError("Wrong Username or Password");
        }
        
    });

    return () => abortCont.abort();
  }

  return (
    <div className="create">
      {error && (
        <div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>{error}</strong>
      </div>
      )}
      <form onSubmit={login}>
        <input 
          type="text" 
          placeholder="Username"
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
}
 
export default Login;