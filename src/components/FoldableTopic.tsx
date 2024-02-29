import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import chevron from "../assets/chevron.png";
import { Link } from "react-router-dom";

interface ActivityLink {
    title: string;
    url: string;
}

interface FoldableTopicProps {
    title: string;
    activities: ActivityLink[];
}

const FoldableTopic = (props : FoldableTopicProps) => { 
    const [isFolded, setIsFolded] = useState(true);
    const toggleFold = () => { setIsFolded(!isFolded); }

    return (
        <div className="shadow-medium">
            <div className="flex justify-between items-center bg-cobalt6 py-3 px-5 rounded-md cursor-pointer" 
                onClick={toggleFold}
            >
                <h3 className="font-semibold text-body-2 text-text-100">
                    {props.title}
                </h3>
                <img 
                    src={chevron} 
                    alt="Arrow icon"
                    className="h-2"
                />
            </div>
            <AnimatePresence>
                {
                    !isFolded &&
                    <div className="flex flex-col gap-6 py-3 px-5 rounded-lg">
                        {
                            props.activities.map((activity, index) => {
                                return (
                                    <Link to={activity.url} key={index} className="text-text-100 text-paragraph-3">
                                        {activity.title}
                                    </Link>
                                );
                            })
                        }
                    </div>
                }
            </AnimatePresence>
        </div>
    );
}

export default FoldableTopic;