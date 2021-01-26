import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext from './context/userContext';
import Axios from 'axios';
import './App.css';
import Project from './components/pages/Project'
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import ReportPage from './components/pages/Report';
// import ReportPage from './components/pages/Report';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [projectsList, setProjectsList] = useState([]);
  // const [reportsList, setReportsList] = useState([]);

  // console.log(process.env.NODE_ENV === 'development')
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
      // console.log(tokenResponse.data);
      if (tokenResponse.data) {
        const userRes = await Axios.get('/users', { 
          headers: { 'x-auth-token': token },
        });
        const projectsData = await Axios.get('http://localhost:5000/projects', { 
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
        setProjectsList(
          projectsData.data
      );
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData, projectsList }}>
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/project/:id" exact component={Project} /> 
            <Route path="/project/:id/:date" exact component={ReportPage} /> 
            <Route path="/login" exact component={Login} /> 
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
