import React from 'react';
import { useParams } from "react-router-dom";


function ReportPage() {

let {  date } = useParams();

    return (
        <>
      
            <div>
                <h3>
                    Data raportu: { date }
                </h3>
                <p>konkretny raport</p>
            </div>
        </>
    )
}

export default ReportPage;
