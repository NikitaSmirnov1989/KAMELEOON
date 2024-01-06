import React, { Dispatch, SetStateAction } from 'react';
import {useState} from "react";
import "./List.css";
import { Link } from 'react-router-dom';
import asc from "../../icons/asc.svg";
import desc from "../../icons/desc.svg";
import empty from "../../icons/empty.svg";

type ItemTest = {
    id: number,
    name: string,
    site: string,
    siteId: string,
    status: string,
    type: string,
}
type Sort = {
    key: string;
    direction: string;
}
const List: React.FC<{setSearchStr: Dispatch<SetStateAction<string>>, list: ItemTest[]}> = ({setSearchStr, list}) => {
    const [sort, setSort] = useState<Sort>({
        key: "make",
        direction: "",
    });
    const cssStatus = (item: string): string => {
        return item === "ONLINE" ? "#1BDA9D" : item === "PAUSED" ? "#FF8346" : item === "DRAFT" ? "#5C5C5C" : "#FE4848";
    };
    
    const cssRect = (baseString: string): string => {
        return baseString.includes("market.company") ? "#E14165" : baseString.includes("delivery.company") ? "#C2C2FF": "#8686FF";
    }
    const camelCaseStyle = (s: string) : string => {
        return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
    }
    const handleKeySort = (key: string) => {
        setSort(prev => {
            return {
                ...prev,
                key,
                direction: prev.key !== key ? "asc" : prev.key === key && prev.direction === "asc" ? "desc" : "asc",
            }
        });
    }
    type HeadItem = {
        label: string,
        key: string,
        id: number,
        className : string,
    }
    const head: HeadItem[] = [
        {
            label: "NAME",
            key: "name",
            id: 0,
            className: "list_name",
        }, 
        {
            label: "TYPE",
            key: "type",
            id: 1,
            className: "list_type",
        }, 
        {
            label: "STATUS",
            key: "status",
            id: 2,
            className: "list_status",
        },
        {
            label: "SITE",
            key: "site",
            id: 3,
            className: "list_site",
        }
    ];
    const renderList = (head: HeadItem[], body: ItemTest[]) => {
        return  (
                <div className="list_block">
                    <ul className="list_block_head">
                        {head.map(({className, label, key, id}, i) => {
                            return  <li key={id} className={className} onClick={() => handleKeySort(key)}>
                                        {label} <img src={
                                                            sort.key === key && sort.direction === "asc" 
                                                            ? asc as unknown as string
                                                            : sort.key === key && sort.direction === "desc"
                                                            ? desc as unknown as string
                                                            : empty as unknown as string
                                                        } 
                                                    alt="sort"/>
                                    </li>
                        })}
                    </ul>
                    <ul className="list_block_body">
                        {body.map(({site, name, status, type, id} ,i) => {
                            return  <li key={id}>
                                        <div className="list_name">
                                            <div className="list_name_wrap">
                                                <div style={{background: cssRect(site)}} className="rect"></div>
                                                <div className="name">
                                                    {name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list_type">{camelCaseStyle(type)}</div>
                                        <div style={{color: cssStatus(status)}} className="list_status">{camelCaseStyle(status)}</div>
                                        <div className="list_site">{site} <Link tabIndex={2} style={{background: id % 2 === 0 ? "#2EE5AC" : "#5C5C5C"}} to={id % 2 === 0 ? `/results/${i+1}` : `/finalize/${i+1}`}>{id % 2 === 0 ? "Results" : "Finalize"}</Link> </div>
                                    </li>
                        })}
                    </ul>

                </div>
                )
    }
    
    const resetResult = () => {
        return  <div className="list_reset">
                    <p>Your search did not match any results.</p>
                    <div className="list_reset_btn">
                        <button tabIndex={1} onClick = {() => setSearchStr("")}>Reset</button>
                    </div>
                </div>
    };
    function sortList(list: any, sort: Sort) : ItemTest[]{
        console.log(list);
        const {key, direction} = sort;
        let sorted = [];
        if(key !== "status"){
            sorted = [...list].sort((a: any, b: any) => {
                if(a[key] > b[key]){
                    return 1;
                }
                if(a[key] < b[key]){
                    return -1;
                };
                return 0;
            });
            /* sorted = direction === "asc" ? sorted : sorted.reverse(); */
        }else{
            //ASC: Online, Paused, Stopped, Draft
            const chanks = [...list].reduce((acc, cur) => {
                const {status} = cur;
                if(status === "ONLINE") acc[0].push(cur);
                else if(status === "PAUSED") acc[1].push(cur);
                else if(status === "STOPPED") acc[2].push(cur);
                else acc[3].push(cur);
                return acc;
            }, [[], [], [], []]);
            sorted = [...chanks].reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
        }
        return direction === "asc" ? sorted : sorted.reverse();
    }
    return  <div className="list">
                {list.length === 0 ? resetResult() : renderList(head, sortList(list, sort))}
            </div>
};
export default List;