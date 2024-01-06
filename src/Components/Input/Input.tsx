import React, { Dispatch, SetStateAction } from 'react';
import './Input.css';
import search from "../../icons/search.svg";

type Props = {
    setSearchStr: Dispatch<SetStateAction<string>>;
    total: number;
    searchStr: string,
}
export default function Input({setSearchStr, total, searchStr}: Props){
    return  <div className="input">
                <div className="search">
                    <img src={search as unknown as string} alt="search"/>
                </div>
                <input tabIndex={1} value={searchStr}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchStr(e.currentTarget.value)}
                        placeholder="What test are you looking for?" 
                        type="text"/>
                <div className="test_counter">{total} Test</div>
            </div>
}