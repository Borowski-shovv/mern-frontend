import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Sidebar  from '../layout/Sidebar';
import Axios from 'axios';

function ReportPage() {
    let { id, date } = useParams();
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const getReport = () => {
            Axios.get('http://localhost:5000/reports/'+id+'/'+date)
                .then(response => setReportData(response.data));
        }
        getReport();


    }, [id, date])

    console.log(reportData[0]?.stats?.googleAnalytics?.clients);

    return (
        <>
            {/* <Sidebar /> */}
            <div>
                <h3>
                    Data raportu: { date }
                </h3>
                <ul>
                    { reportData ? 
                      <>
                        {/* <h2>Data: {reportData[0].date}</h2> */}
                        <li>Liczba klientów: {reportData[0]?.stats?.googleAnalytics?.clients}</li>
                        <li>Nowi klienci: {reportData[0]?.stats?.googleAnalytics?.newClients}</li>
                        <li>Sesje: {reportData[0]?.stats?.googleAnalytics?.sessions}</li>
                        <li>Współczynnik odrzuceń: {reportData[0]?.stats?.googleAnalytics?.bounceRate}</li>
                        <li>Liczba wyświetleń: {reportData[0]?.stats?.googleAnalytics?.views}</li>
                      </>
                        : <p>pobieram dane</p>                      
                    }
                   </ul>
            </div>
        </>
    )
}

export default ReportPage;
