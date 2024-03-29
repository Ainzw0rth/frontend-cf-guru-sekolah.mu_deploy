export interface TagProps {
    color?: string;
    label: string;
    icon?: string; 
    type?: number;       
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

    let tagTypeClass = '';
    let tagPadding = 'px-4';
    if (props.type === 1) {
        tagTypeClass = 'text-label-5';
        tagPadding = 'px-2';
    } else {
        tagTypeClass = 'text-label-4';
    }


    return (
        <div className={`rounded-full w-fit max-[375px]:max-w-48 max-w-64 m-1 ${tagPadding} py-2 ${tagColorClass} ${textColorClass} font-bold flex justify-around items-center`}>
          {props.icon && (
            <img 
                src={props.icon} 
                alt={"Tag icon " + props.label} 
                className="w-4 h-4" />
          )}
          <span className={`${tagTypeClass} truncate`}>{props.label}</span>
        </div>
      );
};

export default Tag;
