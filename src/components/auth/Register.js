import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/userContext';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup'
import { Paper, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

function Register() {
  const [name, setName] = useState('')
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { userEmail, password, passwordCheck, name};
      await Axios.post('http://localhost:5000/users/register', newUser);
      const loginResponse = await Axios.post('http://localhost:5000/users/login', {
        userEmail,
        password,
      });

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });

      localStorage.setItem('auth-token', loginResponse.data.token)
      history.push("/");


    } catch(err) {
      err.response.data.msg && setError(err.response.data.msg)
 
    }
  }

  return (
    <div className="container">
     
      <form onSubmit={handleSubmit}>
        <Paper style={{ padding: 16 }}>
        <h1>Rejestracja</h1>
        <Box margin={1}>
            <FormGroup>
              <TextField id="outlined-basic" label="Imię" variant="outlined"  onChange={(e) => setName(e.target.value)}/>
              </FormGroup>
            </Box>  
            <Box margin={1}>
              <FormGroup>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)}/>
              </FormGroup>
            </Box>
           
            <Box margin={1}>
              <FormGroup>
                <TextField id="outlined-basic" label="Hasło" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
              </Box> 
              <Box margin={1}>
              <FormGroup>
                <TextField id="outlined-basic" label="Potwierdź hasło" variant="outlined" type="password"  onChange={(e) => setPasswordCheck(e.target.value)}/>
              </FormGroup>
            </Box>    
            <Box margin={1}>
            <Button 
              variant="contained"
              color="primary"
              type="submit"
              >Wyślij
            </Button>
            <div>
              {error}
            </div>
          </Box>
      </Paper>
      </form>
    </div>
  );
}

export default Register;
