import React from 'react';
import { useContext, useState, useEffect} from 'react';
import Axios from 'axios';
import './Sidebar.css';
import AuthOptions from '../auth/AuthOption';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';
import { SidebarData } from './SidebarData'; 
import SubMenu from './SubMenu';
import * as AiIcons from 'react-icons/ai';

function Sidebar() {
    const [projectsList, setProjectsList] = useState([]);
    const { userData } = useContext(userContext);

    useEffect(() => {
        const getExercisesList = async () => {
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
            const projectsData = await Axios.get('http://localhost:5000/projects', { 
                headers: { 'x-auth-token': token },
            });
            console.log('dane', projectsData.data)
            setProjectsList(
                projectsData.data
            );
        }
        };
        getExercisesList();
    }, [])

    // console.log(projectsList);

    return (
        <div className="sidebar">
             <Link className="title" to="/">
                <img src={Logo} alt="shovv-logo"/>
            </Link>
            <div className="welcome-text">
                <AiIcons.AiFillHome />
                <h3>Witaj {userData.user.name}!</h3>
            </div>
            
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}

               
            <AuthOptions />
        </div>
    )
}

export default Sidebar
