import { useEffect, useState } from "react";
import { BASE_URL } from "../../const";
import { MaterialData } from "../../types/Material";
import FoldableContent from "../FoldableContent";
import { Skeleton } from "@mui/material";

const fetchContentData = async (activityId : number) => {
    try {
        const response = await fetch(`${BASE_URL}/konten/${activityId}`);
        if (!response.ok) {
            console.error('Failed to fetch material data ' + response.statusText);
            return [];
        }

        const json = await response.json();
        const materialData : MaterialData = json.data.map((content: {
            nama_konten: string;
            file_path: string;
            tipe_file: string;
        }) => ({
            title: content.nama_konten,
            contentUrl: content.file_path,
            type: content.tipe_file
        }));
        return materialData;
    } catch (error) {
        console.error('Failed to fetch material data ' + error);
        return [];
    }
}

interface MaterialTabProps {
    activityId: number;
    materialData?: MaterialData;
    onMaterialDataChange: (data: MaterialData) => void;
}

const MaterialTab = (props : MaterialTabProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!props.materialData || props.materialData.length === 0) {
            setLoading(true);
            fetchContentData(props.activityId)
                .then(data => props.onMaterialDataChange(data))
                .catch(error => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [props.materialData, props.activityId, props.onMaterialDataChange]);

    const materialData = props.materialData || [];

    return (
        <div className="mx-6 flex flex-col gap-6 mt-8">
            {
                loading ? (
                <div>
                    <Skeleton variant="rounded" width="100%" height={30} sx={{marginBottom:3}}/>
                    <Skeleton variant="rounded" width="100%" height={30} sx={{marginBottom:3}}/>
                    <Skeleton variant="rounded" width="100%" height={30} sx={{marginBottom:3}}/>
                    <Skeleton variant="rounded" width="100%" height={30} sx={{marginBottom:3}}/>
                </div>
                ) : (
                materialData.map((material, index) => (
                    <FoldableContent key={index} title={material.title} contentUrl={material.contentUrl} type={material.type}/>
                )))
            }
        </div>
    );
}

export default MaterialTab;