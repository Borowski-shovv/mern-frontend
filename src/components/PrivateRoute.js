import {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom'

import UserContext from '../context/userContext';



const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext);
  
    useEffect(() => {
      console.log("Private Route", userData);
    }, [userData])
  
    return (
      <Route
        render={props =>
          userData !== undefined ? (
            <div>
              {/* <Header {...props} /> */}
              <Component {...props}/>
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
        {...rest}
      />
    )
  };

export default PrivateRoute;