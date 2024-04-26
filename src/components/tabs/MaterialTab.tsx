import { ContentType, MaterialData } from "../../types/Material";
import FoldableContent from "../FoldableContent";

const MATERIAL_DUMMY = [
    {
        title: '[PDF] Modul Pembelajaran Baris Berbaris',
        contentUrl: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
        type: ContentType.PDF
    },
    {
        title: 'Video Pembelajaran Baris Berbaris',
        contentUrl: 'https://www.youtube.com/embed/9QH4FGy6_HY',
        type: ContentType.EMBED
    },
]

interface MaterialTabProps {
    activityId: number;
    materialData?: MaterialData;
    onPresenceDataChange: (data: MaterialData) => void;
}

const MaterialTab = (props : MaterialTabProps) => {
    console.log(props);
    return (
        <div className="mx-6 flex flex-col gap-6 mt-8">
            {
                MATERIAL_DUMMY.map((material, index) => (
                    <FoldableContent key={index} title={material.title} contentUrl={material.contentUrl} type={material.type}/>
                ))
            }
        </div>
    );
}

export default MaterialTab;