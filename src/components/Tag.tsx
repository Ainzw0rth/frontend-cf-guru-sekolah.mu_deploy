export interface TagProps {
    color?: string;
    label: string;
    icon?: string;        
}

const Tag = (props: TagProps) => {
    let tagColorClass = 'bg-cobalt6';
    let textColorClass = 'text-persian-blue-500';

    // Check for color variations
    if (props.color?.toLowerCase().includes('gamboge')) {
        tagColorClass = 'bg-gamboge6';
        textColorClass = 'text-gamboge3';
    } else if (props.color?.toLowerCase().includes('mint')) {
        tagColorClass = 'bg-mint6';
        textColorClass = 'text-mint-500';
    } else if (props.color?.toLowerCase().includes('neutral')) {
        tagColorClass = 'bg-neutral6';
        textColorClass = 'text-neutral-500';
    }

    return (
        <div className={`rounded-full w-fit px-4 py-2 ${tagColorClass} ${textColorClass} font-bold flex justify-around items-center`}>
            {props.icon && 
                <img 
                    src={props.icon} 
                    alt={"Tag icon " + props.label}
                    className="w-4 h-4"
                />
            }
            <span className="text-label-6">{props.label}</span>
        </div>
    );
}

export default Tag;
