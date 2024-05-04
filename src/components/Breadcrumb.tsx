import React from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
    label: string;
    link: string;
}

const Breadcrumb = (props : BreadcrumbProps) => {
    return (
        <div className="px-5 py-2 bg-neutral6 overflow-x-auto whitespace-nowrap">
            <div className="inline-block">
        {
            props.items.map((item, index) => {
                return (
                <React.Fragment key={index}>
                {
                    index < props.items.length - 1 
                    ?
                        <>
                            <Link 
                                to={item.link}
                                className="text-label-1 font-semibold text-persian-blue-500"
                            > {item.label} </Link>
                            <span>&nbsp;&nbsp;&#62;&nbsp;&nbsp;</span>
                        </>
                    :
                        <span 
                            className="text-label-1 font-semibold text-text-100"
                        > {item.label} </span>
                    
                }
                </React.Fragment>
            )})
        }
            </div>
        </div>
    )
}

export default Breadcrumb;