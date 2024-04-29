import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState, useEffect } from 'react';
import { Murid } from "../types/Murid";
import { Kelas } from "../types/Kelas";
import DashboardCard from '../components/DashboardCard';

const DashboardListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMurid, setFilteredMurid] = useState<Murid[]>([]);
    const [filterClass, setFilterClass] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [idKelas, setIdKelas] = useState<number | null>(null);
    const [kelas, setKelas] = useState<Kelas[]>([]);

    const idGuru = 1;

    useEffect(() => {
        fetchClass();
    }, []);

    useEffect(() => {
        if (kelas.length > 0) {
            setFilterClass(kelas[0].name);
            setIdKelas(kelas[0].id);
        }
    }, [kelas]);

    useEffect(() => {
        if (idKelas !== null) {
            fetchClassStudent();
        }
    }, [idKelas]);

    const fetchClass = async () => {
        try {
            const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/kelas?guru=${idGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch class');
            }
            const data = await response.json();

            const kelasData: Kelas[] = data.data.map((classData: any) => ({
                id: classData.id_kelas,
                name: classData.nama_kelas,
                jenjang: classData.jenjang
            }));

            setIsLoading(false);
            setKelas(kelasData);
        } catch (error) {
            console.error('Error fetching class:', error);
        }
    };

    const fetchClassStudent = async () => {
        try {
            console.log('fetching students of class:', idKelas);
            const response = await fetch(`https://backend-sekolah-mu-development.vercel.app/murid?kelas=${idKelas}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student');
            }
            const data = await response.json();

            console.log('data:', data);

            const muridData: Murid[] = data.data.map((studentData: any) => ({
                id: studentData.id_murid,
                name: studentData.nama_murid,
                gender: studentData.jenis_kelamin,
                birth_date: new Date(studentData.tanggal_lahir),
                nisn: studentData.nisn,
                path_profile: studentData.path_foto_profil
            }));

            setFilteredMurid(muridData);
        } catch (error) {
            console.error('Error fetching students of class:', error);
        }
    };

    const handleClassFilterChange = (e: SelectChangeEvent<string>) => {
        const selectedClass = e.target.value;
        setFilterClass(selectedClass);
        const selectedKelas = kelas.find(k => k.name === selectedClass);
        if (selectedKelas) {
            setIdKelas(selectedKelas.id);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filterMurid = (searchValue: string) => {
        let filtered = filteredMurid.filter(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredMurid(filtered);
    };

    const getClassOptions = () => {
        return kelas.map(k => k.name);
    };

    console.log("Show murid:", filteredMurid);

    return (
        <div className='bg-neutral8 h-svh w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100 mb-5'>Dashboard Murid</h1>
            {isLoading ? (
                <p className="text-neutral9 italic">Loading...</p>
            ) : (
                <>
                <div className="flex flex-wrap mb-5">
                    <input
                        type="text"
                        placeholder="Cari Murid"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-1 mr-2"
                        style={{ border: "1px solid #1890ff", borderRadius: "8px", paddingLeft: "10px", marginRight: "8px" }}
                    />
                    <button onClick={() => filterMurid(searchTerm)}
                        className="bg-persian-blue-500 text-white py-3 rounded-md w-20 text-label-4 font-semibold">
                        Cari
                    </button>
                </div>
                <div className="flex-auto flex mb-5">
                    <FormControl>
                        <Select
                            value={filterClass}
                            onChange={handleClassFilterChange} 
                            className="bg-cobalt6 rounded-full"
                        >
                            {getClassOptions().map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    Kelas {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {filteredMurid.length === 0 ? (
                    <p className="text-neutral9 italic">Murid tidak ditemukan</p>
                ) : (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto'>
                            {filteredMurid.map((murid) => (
                                <div key={murid.id} className="w-1/2">
                                    <DashboardCard studentData={murid} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                </>
            )}
        </div>
    );
}

export default DashboardListPage;