import React, { useEffect, useState, useContext} from 'react';
import Sidebar from '../layout/Sidebar';
import Reports from './Report';
import "./Project.css";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import UserContext from '../../context/userContext';
import moment from 'moment';
import 'moment/locale/pl';

function Project() {
    const [project, setProject] = useState();
    const [projectId, setProjectId] = useState()
    const [reports, setReports] = useState([]);
    const {projectsList} = useContext(UserContext);
    let { id, date } = useParams();
    
    const defaultProjectId = projectsList[0]?._id
    console.log("R", reports)
    
    useEffect(() => {
        const getOneProject = () => {
          if(id === undefined) return
            Axios.get('http://localhost:5000/projects/'+id)
              .then(response => {
                setProject(response.data.name);
                setProjectId(response.data._id)
              })
          };
        getOneProject();

        const getProjectReport = (pId) => {
          let projectId;

          (id === undefined) ? projectId = pId : projectId = id;

            Axios.get('http://localhost:5000/reports/'+projectId)
              .then(response => { setReports(response.data) })
            };
        getProjectReport( defaultProjectId);

        // const getMetchedReport = (pId) => {
        //   let projectId;
        //   (id === undefined) ? projectId = pId : projectId = id;
        //   // let time;
        //   // (id === undefined) ? time : ;
        //   // console.log(projectId)

        //     Axios.get('http://localhost:5000/reports/'+projectId+'/'+date)
        //       .then(response => { })
        //     };
        // getMetchedReport(defaultProjectId);
        
    }, [id, date, defaultProjectId])
    
    const reportDate = moment(reports[0]?.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format('MMMM YYYY')
    return (
        <div className="projectPage">
          <Sidebar reports={reports}/>
            {
              id === undefined ? ( 
                <div className="projectPage-report">
                  <h1>{projectsList[0]?.name}</h1> 
                  <h3>
                    Data raportu: { reportDate }
                  </h3>
                   <ul>
                    {
                      <>
                        <li>Liczba klientów: {reports[0]?.stats?.googleAnalytics?.clients}</li>
                        <li>Nowi klienci: {reports[0]?.stats?.googleAnalytics?.newClients}</li>
                        <li>Sesje: {reports[0]?.stats?.googleAnalytics?.sessions}</li>
                        <li>Współczynnik odrzuceń: {reports[0]?.stats?.googleAnalytics?.bounceRate}</li>
                        <li>Liczba wyświetleń: {reports[0]?.stats?.googleAnalytics?.views}</li>
                      </>
                    }
                   </ul>
                </div>
              ) : ( 
                <div className="projectPage-report">
                    {
                    id === projectId && 
                    (
                      <div className="projectPage-report">
                        <h1>{project}</h1>
                        
                        <Reports reports={reports}/>
                        
                      </div>
                    ) 
                  }
                </div>
              )
            }
        </div>
    )
}

export default Project;

