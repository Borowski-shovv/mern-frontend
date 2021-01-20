import React, { useContext} from 'react';
import UserContext from '../../context/userContext';
import Header from '../layout/Header';
import { Link } from "react-router-dom";
import './Home.css';
import { IconContext } from 'react-icons/lib';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Projects from './Projekty';

function Home() {
  const {userData} = useContext(UserContext);

return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
          {userData.user ? (
            <div className="home-wrapper">
            <Router>
              <Sidebar />     
              <Switch>
                <Route exact to="/projekt1" component={Projects}/>
              </Switch>
              
            </Router>
                              
            </div>
          ) : (
            <>
              <div className="homePage">

                <h2>Nie jesteś zalogowany</h2>
                <Link to="/login">Zaloguj się</Link>
              </div>
            </>
          )}

      </IconContext.Provider>
    </div>
  );
}

export default Home;
