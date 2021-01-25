import { useState, useEffect, useRef, useContext} from 'react';
import './DropdownProjects.css';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';
// import { Button } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pl';

const DropDownMenu = ({reports}) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const {id} = useParams()

    const { projectsList } = useContext(userContext);
    
    useEffect(() => {
        const pageClickEvent = (e) => {
            // console.log(e);
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        }
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
        // moment.locale('pl')
        return () => {
                window.removeEventListener('click', pageClickEvent);
            }

        }, [isActive]);
        
        
    // const fetchReportData = (date) => {
    //     console.log(date)  
    //     // Axios.get('http://localhost:5000/reports/'+id, {
    //     //     
    //     // })
    //     // .then(response => { setReports(response.data) })
    // //   };  
    // } 
 
    const onClick = () => setIsActive(!isActive);

    return (
        <div>
            <button onClick={onClick} className="menu-trigger">
              <span>Projekty</span>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    {
                        projectsList.map(project => {
                            return (
                                <li key={project.name}><Link to={'/project/'+project._id}>{project.name}</Link></li>
                            )
                        })
                    }  
                </ul>
            </nav>
            <ul>
                {
                    reports.map(report => {
                        // const date =  moment(report?.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('YYYY-MM');
                        return (
                            <li key={report.date}>
                                <Link to={'/project/'+id+'/'+moment(report?.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('YYYY-MM')}>
                                {moment(`${report?.date}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('MMMM YYYY')}
                                </Link>
                                {/* <Button onClick={() => fetchReportData(date)}>
                                    {moment(`${report?.date}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('MMMM YYYY')}
                                </Button> */}
                            </li>
                        )
                    })
                }
            </ul>
            {/* to={'/project/'+id+'/'+moment(report?.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('YYYY-MM')} */}
        </div>
    )
}

export default DropDownMenu;
