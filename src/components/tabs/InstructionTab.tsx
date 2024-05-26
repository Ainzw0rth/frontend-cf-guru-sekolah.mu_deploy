import { Skeleton } from "@mui/material";
import { InstructionData } from "../../types/Instruction";

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
        return (
            <div className='flex flex-col items-start justify-center mx-2'>                <Skeleton variant="text" width={200} height={50} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={290} height={40} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={310} height={40} sx={{marginLeft: 2}}/>
                <Skeleton variant="text" width={200} height={50} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={290} height={40} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={310} height={40} sx={{marginLeft: 2}}/>
            </div>
        );
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