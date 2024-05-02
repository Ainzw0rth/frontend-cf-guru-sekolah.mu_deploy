import { Murid } from "../types/Murid";

interface StudentIdentityProps {
    student: Murid | null;
    averageScore: number;
}

const StudentIdentity = (props: StudentIdentityProps) => {
    console.log('props:', props);
    console.log('props.student:', props.student);   
    console.log('props.averageScore:', props.averageScore);

    const formattedBirthDate = props.student ? props.student.birth_date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) : '';
    
    return (
        <div className="shadow-md rounded-md overflow-hidden border border-neutral4">
            <div className="bg-persian-blue5 text-neutral6 py-3 px-5 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Identitas</h3>
            </div>
            <div className="flex flex-col gap-4 p-5">
                <div className="flex justify-left">
                    <p className="text-text-100 font-semibold" style={{ width: '150px' }}>Nama</p>
                    <p className="text-text-100  font-semibold mr-2">:</p>
                    <p className="text-text-100">{props.student?.name}</p>
                </div>
                <div className="flex justify-left">
                    <p className="text-gray-800 font-semibold" style={{ width: '150px' }}>Jenis Kelamin</p>
                    <p className="text-text-100 font-semibold mr-2">:</p>
                    <p className="text-text-100">{props.student?.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>
                <div className="flex justify-left">
                    <p className="text-gray-800 font-semibold" style={{ width: '150px' }}>Tanggal Lahir</p>
                    <p className="text-text-100 font-semibold mr-2">:</p>
                    <p className="text-text-100">{formattedBirthDate}</p>
                </div>
                <div className="flex justify-left">
                    <p className="text-gray-800 font-semibold" style={{ width: '150px' }}>NISN</p>
                    <p className="text-text-100 font-semibold mr-2">:</p>
                    <p className="text-text-100">{props.student?.nisn}</p>
                </div>
                <div className="flex justify-left">
                    <p className="text-gray-800 font-semibold" style={{ width: '150px' }}>Rata-Rata Nilai</p>
                    <p className="text-text-100 font-semibold mr-2">:</p>
                    <p className="text-text-100">{props.averageScore != null ? props.averageScore : "-"}</p>
                </div>
            </div>
        </div>
    );
}


export default StudentIdentity;