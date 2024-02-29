import FoldableTopic from "../components/FoldableTopic";
import Tag from "../components/Tag";

const PROGRAM_DUMMY = {
    id: 1,
    slug: 'matematika-sd-kelas-1',
    judul: 'Matematika SD Kelas 1',
    imgUrl: 'https://images.unsplash.com/photo-1613563696485-f64240817218?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tujuan: [
        'Mengembangkan keterampilan berhitung interaktif',
        'Mendorong kreativitas dalam mengenali bentuk geometris',
        'Menumbuhkan pemahaman tentang konsep pengukuran',
    ],
    kompetensi: [
        'Bekerja sama', 'Mandiri', 'Komunikatif', 'Kreatif', 'Berpikir Kritis'
    ],
    periode: {
        tahun_ajaran: '2023/2024',
        semester: '1',
    },
    topik: [
        {
            title: 'Penjumlahan dan Pengurangan',
            activities: [
                {title: 'Penjumlahan dan Pengurangan 1 Angka', url: '#'},
                {title: 'Penjumlahan dan Pengurangan 2 Angka', url: '#'},
                {title: 'Penjumlahan dan Pengurangan 3 Angka', url: '#'},
            ]
        },
        {
            title: 'Bangun Datar',
            activities: [
                {title: 'Pengenalan Bentuk-Bentuk Dasar', url: '#'},
                {title: 'Pengenalan Sifat Bangun Datar', url: '#'},
                {title: 'Identifikasi Bangun Datar di Lingkungan', url: '#'},
            ]
        },
        {
            title: 'Pengukuran',
            activities: [
                {title: 'Pengukuran Panjang', url: '#'},
                {title: 'Pengukuran Berat', url: '#'},
            ]
        }
    ]
}

const ProgramBanner = (props : {imgUrl : string, judul : string}) => {
    return (
        <div>
            <img 
                src={props.imgUrl} 
                alt={`Banner ${props.judul}`}
                className="w-full h-60 object-cover"
            />
            <div className="w-fit bg-cobalt6 px-5 py-2 shadow-medium -translate-y-1/2 z-20">
                <h1 className="font-bold text-program-title text-text-100">{props.judul}</h1>
            </div>
        </div>
    );
}

const ProgramDetail = () => { 
    const fetchProgramData = () => { 
        // TODO : Fetch data from Backend
        return PROGRAM_DUMMY;
    }
    const data = fetchProgramData();
    return (
        <div className="flex flex-col">
            <ProgramBanner imgUrl={data.imgUrl} judul={data.judul}/>
            <div className="px-5">
                <h2 className="font-semibold text-heading-4 text-text-100 mb-5">Tujuan Pembelajaran</h2>
                <ul className="flex flex-col list-disc ml-4">
                { 
                    data.tujuan.map((tujuan, index)  => {
                        return <li className="text-lg text-neutral-900" key={index}>
                            {tujuan}
                        </li>
                    })
                }
                </ul>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Kompetensi</h2>
                <div className="flex flex-wrap gap-2">
                    {
                        data.kompetensi.map((kompetensi, index) => {
                            return <Tag label={kompetensi} key={index}/>
                        })
                    }
                </div>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Periode Pengajaran</h2>
                <p className="text-neutral-900 text-paragraph-3">
                    {`Semester ${data.periode.semester} Tahun Ajaran ${data.periode.tahun_ajaran}`}
                </p>
                <h2 className="font-semibold text-heading-4 text-text-100 my-5">Topik Pembelajaran</h2>
                <div className="flex flex-col gap-4 mb-6">
                {
                    data.topik.map((topik, index) => {
                        return <FoldableTopic title={topik.title} activities={topik.activities} key={index}/>
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default ProgramDetail;