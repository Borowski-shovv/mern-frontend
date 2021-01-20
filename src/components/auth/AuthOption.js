import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import './AuthOption.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function AuthOption() {
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);

  const history = useHistory();

  // const handleRegister = () => history.push('/register');
  const handleLogin = () => history.push('/login');
  const handleLogout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
    history.push('/');
  }
  return (
    <div className="auth-options">
      {/* <button onClick={handleRegister}>Rejestracja</button> */}
      {
        userData.user ? ( 
          <button onClick={handleLogout}>
            <ExitToAppIcon />
          </button> 
        ) : (
          <button onClick={handleLogin}>Zaloguj się</button> 
        )
      }
    </div>
  );
}

export default AuthOption;
