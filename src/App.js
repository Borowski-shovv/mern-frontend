import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext from './context/userContext';
import Axios from 'axios';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import PrivateRoute from './components/PrivateRoute';
import Projects from './components/pages/Projekty';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenResponse = await Axios.post('/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token },
      });
      console.log(tokenResponse.data);
      if (tokenResponse.data) {
        const userRes = await Axios.get('/users', { 
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/login" exact component={Login} /> 
            {/* <Route path="/projekty" exact component={Projects} />  */}
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            {/* <Route path="/register" exact component={Register} /> */}
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
