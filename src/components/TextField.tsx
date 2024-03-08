import { motion } from 'framer-motion';
import { useState } from 'react';

export interface TextFieldProps {
    label: string;
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = (props : TextFieldProps) => { 
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    }

    const handleBlur = () => {
        setIsActive(props.value !== '');
    }

    return (
        <div className='relative'>
            <motion.label 
                className={`absolute left-5 transition-all duration-300
                    text-paragraph-2 pointer-events-none
                    ${isActive ? '-top-3 text-persian-blue-500' : 'top-1/3 text-neutral1'}`
                }
                animate={{scale: isActive ? 0.9 : 1}}
            >
                {props.label}
            </motion.label>
            <input 
                type={props.type}
                value={props.value} 
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => props.onChange(e)}
                className="
                    w-full border-b-2 border-neutral3 bg-neutral5 rounded-xl
                    text-paragraph-2 text-text-100 h-16 px-5
                    focus:outline-none focus:border-persian-blue-500
                "
            />
        </div>
    )
}

export default TextField;