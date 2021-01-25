import React, { useContext} from 'react';
import UserContext from '../../context/userContext';
import { Link } from "react-router-dom";
import './Home.css';
import { IconContext } from 'react-icons/lib';
import Project from './Project';
import moment from 'moment';

function Home() {
  const {userData} = useContext(UserContext);
  moment.locale('pl')


return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
          {userData.user ? (
            <div className="home-wrapper">
             <Project /> 
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

//sprawdzenie czy id jest zdefiniowanie jezeli jest to pobierz z db dany projekt - na podstawie user.id i project.id
  //  jezeli nie ma pobierz pierwszy na podstawie id.usera
  // jezeli nie ma projektow wyswietl komunikat
  //jezeli projekt zostal znaleziony to na podstawie daty z urla pobierz raporty 
  //jezeli nie ma daty w urlu to pobierz raporty z ostatniego miesiaca, ktory istnieje w bazie
