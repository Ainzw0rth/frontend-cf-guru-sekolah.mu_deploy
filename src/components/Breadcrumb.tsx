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
        <div className="px-5 py-2 bg-neutral6 overflow-scroll whitespace-nowrap">
        {
            props.items.map((item, index) => {
                return (
                <>
                {
                    index < props.items.length - 1 
                    ?
                        <>
                            <Link 
                                to={item.link} key={index}
                                className="text-label-1 font-semibold text-persian-blue-500"
                            > {item.label} </Link>
                            <span>&nbsp;&nbsp;&#62;&nbsp;&nbsp;</span>
                        </>
                    :
                        <span 
                            key={index}
                            className="text-label-1 font-semibold text-text-100"
                        > {item.label} </span>
                    
                }
                </>
            )})
        }
        </div>
    )
}

export default Breadcrumb;