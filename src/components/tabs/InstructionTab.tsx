import { INSTRUCTION } from "../../data/activityInstruction";
import { InstructionData } from "../../types/Instruction";

const fetchInstructionData = (activityId: number) => {
    console.log(`Fetching instruction data for activity ${activityId}`);
    return INSTRUCTION;
}

const InstructionCard = ({title, content} : {title: string, content: string[]}) => {
    return (
        <div className="px-5">
            <h3 className="font-semibold text-heading-2 text-text-100 mb-5">{title}</h3>
            <ul className="flex flex-col list-disc ml-4">
                {
                    content.map((tujuan, index) => {
                        return (
                            <li className="text-lg text-neutral-900" key={index}>
                                {tujuan}
                            </li>
                        );
                    }) 
                }
            </ul>
        </div>
    );
}

interface InstructionTabProps {
    activityId: number;
    instructionData?: InstructionData;
    onInstructionDataChange: (data: InstructionData) => void;
}

const InstructionTab = (props : InstructionTabProps) => {
    if (!props.instructionData) {
        props.onInstructionDataChange(fetchInstructionData(props.activityId));
        return <div>Loading...</div>;
    }
    
    const data : InstructionData = props.instructionData;
    
    return (
        <div className="flex flex-col mt-10 gap-10 w-5/6 mx-3">
            <InstructionCard title="Tujuan Pembelajaran" content={data.tujuanPembelajaran}/>
            <InstructionCard title="Instruksi Guru" content={data.instruksiGuru}/>
            <InstructionCard title="Instruksi Murid" content={data.instruksiMurid}/>
        </div>
    );
}

export default InstructionTab;