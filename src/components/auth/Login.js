import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/userContext';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup'
import { Paper, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import './Login.css';
import Logo from '../../assets/logo.png'

function Login() {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const loginUser = { userEmail, password};
    const loginRes = await Axios.post('http://localhost:5000/users/login', loginUser)
    
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })

    localStorage.setItem("auth-token", loginRes.data.token)
    
    history.push('/');
    } catch(err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  } 

  return (
    <div className="loginPage">
      <div className="login-header">
          <img src={Logo} alt="shovv-logo"/>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Paper style={{padding: 16}}>
            <h2>Logowanie</h2>
            <Box margin={1}>
              <FormGroup>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>    
            </Box>  
            <Box margin={1}>
              <FormGroup>
                <TextField id="outlined-basic" label="Hasło" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
            </Box>
            <Button type="submit"  variant="contained" color="primary">Zaloguj</Button>
            <div className="error-msg">
              {error}
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
}

export default Login;
