import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Results.css';
import back from "../../../icons/back.svg";

export default function Results(){
    
    return  <div className="results">
                <div>
                    <h1>Results</h1>
                    <p>Order basket redesing</p>
                </div>
                <div className="results_link">
                    <Link tabIndex={1} to="/"><img src={back as unknown as string} alt="search"/>   Back</Link>
                </div>
            </div>
}