import React from 'react';
import { useContext } from 'react';
// import Axios from 'axios';
import './Sidebar.css';
import AuthOptions from '../auth/AuthOption';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';
import * as AiIcons from 'react-icons/ai';
import DropDownMenu from './DropdownProjects';


function Sidebar({reports}) {
    const { userData } = useContext(userContext);

    return (
        <div className="sidebar">
             <Link className="title" to="/">
                <img src={Logo} alt="shovv-logo"/>
            </Link>
            <div className="welcome-text">
                <AiIcons.AiFillHome />
                <h3>Witaj {userData?.user?.name} !</h3>
            </div>
            <DropDownMenu reports={reports}/>
            <AuthOptions />
        </div>
    )
}

export default Sidebar
