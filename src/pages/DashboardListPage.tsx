import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { Murid } from "../types/Murid";
import { Kelas } from "../types/Kelas";
import DashboardCard from '../components/DashboardCard';
import { BASE_URL } from "../const";
import { getTeacherId } from "../utils/authUtils";

const DashboardListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMurid, setFilteredMurid] = useState<Murid[]>([]);
    const [filterClass, setFilterClass] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [idKelas, setIdKelas] = useState<number | null>(null);
    const [kelas, setKelas] = useState<Kelas[]>([]);

    const idGuru = getTeacherId();

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
            const response = await fetch(`${BASE_URL}/kelas?guru=${idGuru}`);
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
            setIsLoading(false);
        }
    };

    const fetchClassStudent = async () => {
        try {
            console.log('fetching students of class:', idKelas);
            const response = await fetch(`${BASE_URL}/murid?kelas=${idKelas}`);
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

            setIsLoading(false);
            setFilteredMurid(muridData);
        } catch (error) {
            console.error('Error fetching students of class:', error);
            setIsLoading(false);
        }
    };

    const handleClassFilterChange = (e: SelectChangeEvent<string>) => {
        setIsLoading(true);
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

    const handleSearchClick = () => {
        if (searchTerm.trim() !== "") {
            setIsLoading(true);
            filterMurid(searchTerm);
        } else {
            setIsLoading(true);
            setFilteredMurid([]);
            fetchClassStudent();
        }
    };
    
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim() !== "") {
                setIsLoading(true);
                filterMurid(searchTerm);
            } else {
                setIsLoading(true);
                setFilteredMurid([]);
                fetchClassStudent();
            }
        }
    };    

    const filterMurid = (searchValue: string) => {
        let filtered = filteredMurid.filter(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        setIsLoading(false);
        setFilteredMurid(filtered);
    };

    const getClassOptions = () => {
        return kelas.map(k => k.name);
    };

    console.log("Show murid:", filteredMurid);

    return (
        <div className='bg-neutral8 w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100 mb-5'>Dashboard Murid</h1>
            <div className="flex flex-wrap mb-5">
                <input
                    type="text"
                    placeholder="Cari Murid"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 mr-2"
                    style={{ border: "1px solid #1890ff", borderRadius: "8px", paddingLeft: "10px", marginRight: "8px" }}
                />
                <button onClick={handleSearchClick}
                    className="bg-persian-blue-500 text-white py-3 rounded-md w-20 text-label-4 font-semibold">
                    Cari
                </button>
            </div>
            {isLoading ? (
                <p className="text-neutral9 italic">Loading...</p>
            ) : (
            <>
                <div className="flex flex-col mb-5 w-full mx-auto">
                    <FormControl>
                        <Select
                            value={filterClass}
                            onChange={handleClassFilterChange} 
                            className="bg-cobalt6 rounded-full"
                            style={{ lineHeight: '14px' }}
                        >
                            {getClassOptions().map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    <Typography variant="body1" style={{ fontSize: '14px' }}>Kelas {option}</Typography>
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