import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Breadcrumb from "../components/Breadcrumb";
import FoldableTopic, { FoldableTopicProps } from "../components/FoldableTopic";
import ProgramBanner from "../components/ProgramBanner";
import Tag from "../components/Tag";
import { BASE_URL } from "../const";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

interface ProgramBasicData {
    id: number;
    nama: string;
    tujuanPembelajaran: string[];
    imgUrl: string;
    periodePembelajaran: string;
}


type ProgramActivities = FoldableTopicProps[];
type ProgramCompetencies = string[];

const ORIGIN_URL = window.location.origin;

const ProgramDetailPage = () => { 
    let programId = -1;

    const [programData, setProgramData] = useState<ProgramBasicData>({id: -1, nama: '', tujuanPembelajaran: [], imgUrl: '', periodePembelajaran: ''});
    const [programCompetencies, setProgramCompetencies] = useState<ProgramCompetencies>([]);
    const [programActivities, setProgramActivities] = useState<ProgramActivities>([]);
    const [loading, setLoading] = useState(true);

    const fetchProgramData = async (programId : number) : Promise<ProgramBasicData> => { 
        try {
            const response = await fetch(`${BASE_URL}/program/${programId}`);
            if (!response.ok) {
                return {id: -1, nama: '', tujuanPembelajaran: [], imgUrl: '', periodePembelajaran: ''};
            }

            const json = await response.json();
            const programData : ProgramBasicData = {
                id: json.data[0].id_program,
                nama: json.data[0].nama_program,
                tujuanPembelajaran: json.data[0].tujuan_pembelajaran.split('\n'),
                imgUrl: json.data[0].path_banner,
                periodePembelajaran: `${json.data[0].periode_belajar} Tahun Ajaran ${json.data[0].tahun_akademik}`
            };

            return programData;
        } catch (error) {
            console.error('Failed to fetch program data ' + error);
            return {id: -1, nama: '', tujuanPembelajaran: [], imgUrl: '', periodePembelajaran: ''};
        }
    }

    const fetchProgramCompetencies = async (programId : number) : Promise<ProgramCompetencies> => {
        try {
            const response = await fetch(`${BASE_URL}/program/kompetensi/${programId}`);
            if (!response.ok) {
                return [];
            }

            const json = await response.json();
            const competencies : ProgramCompetencies = json.data;
            return competencies;
        } catch (error) {
            console.error('Failed to fetch program competencies ' + error);
            return [];
        }
    }

    const fetchProgramActivities = async (programId : number) => {
        try {
            const response = await fetch(`${BASE_URL}/program/kegiatan/${programId}`);
            if (!response.ok) {
                return [];
            }

            const json = await response.json();
            const activities : ProgramActivities = json.data.map((topic: {
                nama_topik: string;
                kegiatan: {id_kegiatan: number, nama_kegiatan: string}[]
            }) => ({
                title: topic.nama_topik,
                activities: topic.kegiatan.map((activity: {id_kegiatan: number, nama_kegiatan: string}) => ({
                    title: activity.nama_kegiatan,
                    url: `${ORIGIN_URL}/activity/${activity.id_kegiatan}`
                }))
            }));
            return activities;
        } catch (error) {
            console.error('Failed to fetch program activities ' + error);
            return [];
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchProgramData(programId)
            .then(data => setProgramData(data))
            .catch(err => console.error(err));

        fetchProgramCompetencies(programId)
            .then(data => setProgramCompetencies(data))
            .catch(err => console.error(err));

        fetchProgramActivities(programId)
            .then(data => setProgramActivities(data))
            .catch(err => console.error(err));
        setLoading(false);
    }, [programId]);

    const breadcrumb = [
        {label: 'Home', link: '/'},
        {label: 'Program', link: '/program'},
        {label: programData.nama, link: `/program/${programData.id}`}
    ];

    const { id } = useParams<{id: string}>();
    if (!id) { return <div>Invalid Program ID</div>; }
    programId = parseInt(id);

    if (programData.id === -1) {
        return (
            <div className='flex flex-col items-start justify-center mx-2'>
                <Skeleton variant="rectangular" width='100%' height={260} sx={{marginTop: 12, alignSelf:'center'}}/>
                <Skeleton variant="text" width={200} height={50} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={290} height={40} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={310} height={40} sx={{marginLeft: 2}}/>
                <Skeleton variant="text" width={200} height={50} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={290} height={40} sx={{marginLeft: 2, marginTop: 2}}/>
                <Skeleton variant="text" width={310} height={40} sx={{marginLeft: 2}}/>
            </div>
        );
    }

    return (
        <main className="flex flex-col">
            <AppBar title={programData.nama}/>
            <Breadcrumb items={breadcrumb}/>
            <ProgramBanner imgUrl={programData.imgUrl} judul={programData.nama}/>
            <div className="px-5">
                <h2 className="font-semibold text-heading-4 text-text-100 mb-5">Tujuan Pembelajaran</h2>
                <ul className="flex flex-col list-disc ml-4">
                { 
                    programData.tujuanPembelajaran.map((tujuan, index)  => {
                        return <li className="text-lg text-neutral-900" key={index}>
                            {tujuan}
                        </li>
                    })
                }
                </ul>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Kompetensi</h2>
                <div className="flex flex-wrap gap-2">
                    {
                        programCompetencies.map((kompetensi, index) => {
                            return <Tag label={kompetensi} key={index}/>
                        })
                    }
                </div>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Periode Pengajaran</h2>
                <p className="text-neutral-900 text-paragraph-3">
                    {programData.periodePembelajaran}
                </p>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Topik Pembelajaran</h2>
                <div className="flex flex-col gap-4 mb-6">
                {
                    programActivities.map((topik, index) => {
                        return <FoldableTopic 
                            title={topik.title}
                            activities={topik.activities}
                            key={index}
                        />
                    })
                }
                </div>
            </div>
        </main>
    );
}

export default ProgramDetailPage;