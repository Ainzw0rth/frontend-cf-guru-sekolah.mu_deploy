import {ChangeEvent, KeyboardEvent, useState, useEffect} from 'react';
import ProgramCard from "../components/ProgramCard";
import Pagination from "../components/Pagination";
import { Program } from "../types/Program";
import { Activity } from '../types/Activity';
import { BASE_URL } from '../const';
import { getTeacherId } from '../utils/authUtils';
import { Skeleton } from '@mui/material';

var programs: Program[] = [];
var kegiatan: Activity[] = [];

const ProgramListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const [classFilterOptions, setClassFilterOptions] = useState<string[]>([]);
    const [isInitialFetch, setIsInitialFetch] = useState(true);
    
    const programsPerPage = 10;
    const idGuru = getTeacherId();

    useEffect(() => {
        fetchPrograms();
        fetchActivities();
    }, []);

    useEffect(() => {
        if (isInitialFetch) {
            setFilterOptions(getFilterOptions());
            setClassFilterOptions(getClassFilterOptions(filteredPrograms));
            setIsInitialFetch(false);
        }
    }, [filteredPrograms]);

    const fetchPrograms = async () => {
        try {
            const response = await fetch(`${BASE_URL}/program/guru/${idGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch programs');
            }
            const data = await response.json();

            programs = data.data.map((programData: any) => ({
                id: programData.id_program,
                title: programData.nama_program,
                semester: parseInt(programData.periode_belajar.split(" ")[1]),
                academic_year: programData.tahun_akademik,
                imageUrl: programData.path_banner,
            }));

            setFilteredPrograms(programs);
            filterPrograms('', '', '');
            setIsLoading(false);
            setIsInitialFetch(true);
        } catch (error) {
            console.error('Error fetching programs:', error);
            setIsLoading(false);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await fetch(`${BASE_URL}/kegiatan/guru?id=${idGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            const data = await response.json();
    
            kegiatan = data.data.map((activityData: any) => ({
                id: activityData.id_kegiatan,
                title: activityData.nama_kegiatan,
                class: activityData.nama_kelas,
                program: activityData.nama_program,
                topic: activityData.nama_topik,
                date: activityData.tanggal.split('T')[0],
                time: activityData.waktu,
                taskPercentage: 0
            }));

        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const onPageChange = (page: number) => setCurrentPage(page);
    const indexOfLastProgram = currentPage * programsPerPage;
    const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
    const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        setIsLoading(true);
        filterPrograms(searchTerm, filterValue, filterClass);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsLoading(true);
            filterPrograms(searchTerm, filterValue, filterClass);
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true);
        setFilterValue(e.target.value);
        if (e.target.value === '') {
            filterPrograms(searchTerm, '', filterClass);
        } else {
            filterPrograms(searchTerm, e.target.value, filterClass);
        }
    };

    const handleClassFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true);
        setFilterClass(e.target.value);
        filterPrograms(searchTerm, filterValue, e.target.value);
    };

    const filterPrograms = (searchValue: string, filterValue?: string, filterClass?: string) => {
        let filtered = programs.filter(program =>
            program.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    
        if (filterValue) {
            let formattedFilterValue = filterValue;
            if (filterValue.startsWith("Semester ")) {
                formattedFilterValue = filterValue.substring(9);
            }
            const [semester, academicYear] = formattedFilterValue.split(" ");
            filtered = filtered.filter(program =>
                program.semester === parseInt(semester) &&
                program.academic_year === academicYear
            );
        }
    
        if (filterClass) {
            filtered = filtered.filter(program =>
                kegiatan.some(kegiatan =>
                    kegiatan.class === filterClass && kegiatan.program === program.title
                )
            );

        }
        
        const uniquePrograms: { [key: number]: Program } = {};

        filtered.forEach(program => {
            uniquePrograms[program.id] = program;
        });

        filtered = Object.values(uniquePrograms);
    
        setIsLoading(false);
        setFilteredPrograms(filtered);
    };
    

    const getFilterOptions = () => {
        const options: string[] = [];
        const uniqueOptions: string[] = [];
        programs.forEach(program => {
            const option = `Semester ${program.semester} ${program.academic_year}`;
            if (!uniqueOptions.includes(option)) {
                options.push(option);
                uniqueOptions.push(option);
            }
        });

        // Sort the options
        options.sort((a, b) => {
            const yearA = parseInt(a.split(' ')[2].split('/')[0]);
            const yearB = parseInt(b.split(' ')[2].split('/')[0]);
            const semesterA = parseInt(a.split(' ')[1]);
            const semesterB = parseInt(b.split(' ')[1]);
      
            if (yearA === yearB) {
              return semesterB - semesterA;
            } else {
              return yearB - yearA;
            }
        });

        return options;
    };

    const getClassFilterOptions = (filteredPrograms: Program[]) => {
        const classOptions: string[] = [];
    
        filteredPrograms.forEach(program => {
            kegiatan.forEach(kegiatan => {
                if (kegiatan.program === program.title && !classOptions.includes(kegiatan.class)) {
                    classOptions.push(kegiatan.class);
                }
            });
        });
    
        classOptions.sort((a, b) => {
            return a.localeCompare(b);
        });

        return classOptions;
    };

    return (
        <div className='bg-neutral8 w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100 mb-5'>Daftar Program</h1>
            {isLoading ? (
                <div className="">
                    <Skeleton variant='text' width='100%' height={70} />
                    <div className='flex flex-row justify-start'>
                        <Skeleton variant='text' width={150} height={30} sx={{marginRight:1}} />
                        <Skeleton variant='text' width={50} height={30} />
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0 overflow-y-auto'>
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}} />
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}}/>
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}}/>
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}}/>
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}}/>
                        <Skeleton variant='text' width={120} height={200} sx={{marginBottom:0, marginTop:0}}/>
                    </div>
                </div>
            ) : (
                <>
                <div className="flex flex-wrap mb-5">
                    <input
                        type="text"
                        placeholder="Cari Judul Program"
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
                <div className="flex-auto flex mb-5">
                <div className="mr-2">
                    <select 
                        value={filterValue} 
                        onChange={handleFilterChange} 
                        className="filter-dropdown px-2 py-1 border bg-neutral5 rounded-md flex-auto mb-2 sm:mb-0"
                        style={{ fontSize: '0.8rem'}}
                    >
                        <option value="">Periode</option>
                        {filterOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </div>
                    <div>
                    <select
                        value={filterClass}
                        onChange={handleClassFilterChange}
                        className="filter-dropdown px-2 py-1 border bg-neutral5 rounded-md flex-auto mb-2 sm:mb-0"
                        style={{ fontSize: '0.8rem'}}
                    >
                        <option value="">Kelas</option>
                        {classFilterOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
                {currentPrograms.length === 0 ? (
                    <p className="text-neutral9 italic">Program tidak ditemukan</p>
                ) : (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto'>
                            {currentPrograms.map((program) => (
                                <div key={program.id} className="w-1/2">
                                    <ProgramCard program={program} type={1} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '30px', display: 'grid', placeItems: 'center' }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredPrograms.length / programsPerPage)}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </>
                )}
                </>
            )}
        </div>
    );
}

export default ProgramListPage;