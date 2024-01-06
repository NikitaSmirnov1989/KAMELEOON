import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Finalize.css';
import back from "../../../icons/back.svg";

export default function Finalize(){
    
    return  <div className="finalize">
                <div>
                    <h1>Finalize</h1>
                    <p>Spring promotion</p>
                </div>
                <div className="finalize_link">
                    <Link tabIndex={1} to="/"><img src={back as unknown as string} alt="search"/>   Back</Link>
                </div>
                
            </div>
}