import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chevron from "../assets/chevron.png";
import { ContentType } from "../types/Material";
import EmbeddedLink from "./EmbeddedLink";
import PdfViewer from "./PdfViewer";

interface FoldableContentProps {
    title: string;
    contentUrl: string;
    type: ContentType;
}

const FoldableContent = (props : FoldableContentProps) => { 
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
                <motion.img 
                    src={chevron} 
                    alt="Arrow icon"
                    className="h-2"
                    animate={isFolded ? {rotate: 0} : {rotate: 180}}
                    transition={{duration: 0.3}}
                />
            </div>
            <AnimatePresence>
                {
                    !isFolded &&
                    <motion.div 
                        className="flex flex-col gap-6 px-5 overflow-hidden"
                        initial={{opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0}}
                        animate={{opacity: 1, height: "auto", paddingTop: 12, paddingBottom: 12}}
                        exit={{opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0}}
                        transition={{duration: 0.3}}
                    >
                        {
                            props.type === ContentType.PDF ? 
                            <PdfViewer contentUrl={props.contentUrl}/> :
                            <EmbeddedLink src={props.contentUrl}/>
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default FoldableContent;