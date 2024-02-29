export interface TagProps {
    label: string;
    icon?: string;        
}

const Tag = (props : TagProps) => {
    return (
        <div className={`rounded-full w-fit bg-cobalt6  px-4 py-2
            text-persian-blue-500 font-bold flex justify-around items-center`}
        >
            {
                props.icon &&
                <img 
                    src={props.icon} 
                    alt={"Tag icon " + props.label}
                    className="w-4 h-4"
                />
            }
            <span className="text-label-6">{props.label}</span>
        </div>
    )
}

export default Tag;