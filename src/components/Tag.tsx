export interface TagProps {
    label: string;
    icon?: string;        
}

const Tag = (props : TagProps) => {

    return (
        <div className={`rounded-full w-fit bg-cobalt6  px-4 py-2.5
            text-persian-blue-500 font-bold flex justify-center items-center`}
        >
            {props.label}
        </div>
    )
}

export default Tag;