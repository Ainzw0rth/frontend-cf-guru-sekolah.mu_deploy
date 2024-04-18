import {ChangeEvent, KeyboardEvent, useState, useEffect} from 'react';
import ProgramCard from "../components/ProgramCard";
import Pagination from "../components/Pagination";
import { Program } from "../types/Program";
import { Activity } from '../types/Activity';

/*
const programs: Program[] = [
    {
      id: 1,
      title: 'Program 1',
      semester: 1,
      academic_year: '2021/2022',
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      title: 'Program 2',
      semester: 2,
      academic_year: '2021/2022',
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      title: 'Program 3',
      semester: 1,
      academic_year: '2022/2023',
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
        id: 4,
        title: 'Program 4',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
    {
        id: 5,
        title: 'Program 5',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
    {
        id: 6,
        title: 'Program 6',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },  
    {
        id: 7,
        title: 'Program 7',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
];

const kegiatan: Activity[] = [
    {
        id: 1,
        title: 'Kegiatan 1',
        class: 'SD Kelas 1',
        program: 'Program 1',
        topic: 'Topic A',
        date: '2022-03-20',
        time: '10:00',
        imageUrl: 'https://via.placeholder.com/300',
        taskPercentage: 0,
    },
    {
        id: 2,
        title: 'Kegiatan 2',
        class: 'TK A',
        program: 'Program 1',
        topic: 'TK A',
        date: '2022-03-20',
        time: '10:00',
        imageUrl: 'https://via.placeholder.com/300',
        taskPercentage: 0,
    },
    {
        id: 3,
        title: 'Kegiatan 3',
        class: 'SD Kelas 1',
        program: 'Program 3',
        topic: 'Topic A',
        date: '2022-03-20',
        time: '10:00',
        imageUrl: 'https://via.placeholder.com/300',
        taskPercentage: 0,
    },
    {
        id: 3,
        title: 'Kegiatan 4',
        class: 'SD Kelas 2',
        program: 'Program 4',
        topic: 'Topic A',
        date: '2022-03-20',
        time: '10:00',
        imageUrl: 'https://via.placeholder.com/300',
        taskPercentage: 0,
    },
    // Add more activities as needed
];
*/
var programs: Program[] = [];
var kegiatan: Activity[] = [];

const ProgramListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const programsPerPage = 2;
    const idGuru = 1;

    useEffect(() => {
        fetchPrograms();
        fetchActivities();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch(`https://backend-sekolah-mu-development-ainzw0rth.vercel.app/program/guru/${idGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch programs');
            }
            const data = await response.json();

            programs = data.data.map((programData: any) => ({
                id: programData.id_program,
                title: programData.nama_program,
                semester: parseInt(programData.periode_belajar.split(" ")[1]),
                academic_year: programData.tahun_akademik,
                imageUrl: 'https://via.placeholder.com/300',
            }));

            for (let i = 1; i <= 5; i++) {
                programs.push({
                    id: programs.length + 1,
                    title: `PDummy ${i}`,
                    semester: 2,
                    academic_year: '2022/2023',
                    imageUrl: 'https://via.placeholder.com/300',
                });
            }

            setFilteredPrograms(programs);
            filterPrograms('', '', '');
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching programs:', error);
            setIsLoading(false);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await fetch(`https://backend-sekolah-mu-development-ainzw0rth.vercel.app/kegiatan/guru?id=${idGuru}`);
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            const data = await response.json();
    
            kegiatan = data.data.rows.map((activityData: any) => ({
                id: activityData.id_kegiatan,
                title: activityData.nama_kegiatan,
                class: activityData.nama_kelas,
                program: activityData.nama_program,
                topic: activityData.nama_topik,
                date: activityData.tanggal.split('T')[0],
                time: activityData.waktu,
                imageUrl: 'https://via.placeholder.com/300',
                taskPercentage: 0
            }));

            for (let i = 1; i <= 5; i++) {
                kegiatan.push({
                    id: kegiatan.length + 1,
                    title: `Kegiatan Dummy ${i}`,
                    class: 'Dummy Class',
                    program: `PDummy ${i}`,
                    topic: 'Dummy Topic',
                    date: '2022-01-01',
                    time: '08:00:00',
                    imageUrl: 'https://via.placeholder.com/300',
                    taskPercentage: 0
                });
            }
    
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
    }

    const handleSearchClick = () => {
        filterPrograms(searchTerm, filterValue, filterClass);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            filterPrograms(searchTerm, filterValue, filterClass);
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value);
        if (e.target.value === ''){
            filterPrograms(searchTerm, '', filterClass);
        } else {
            filterPrograms(searchTerm, e.target.value, filterClass);
        }
    }

    const handleClassFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterClass(e.target.value);
        filterPrograms(searchTerm, filterValue, e.target.value);
    }

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

    const getClassFilterOptions = () => {
        const classOptions: string[] = [];
        kegiatan.forEach(kegiatan => {
          if (!classOptions.includes(kegiatan.class)) {
            classOptions.push(kegiatan.class);
          }
        });

        classOptions.sort((a, b) => {
            return a.localeCompare(b);
        });

        return classOptions;
    };


    return (
        <div className='bg-neutral8 h-svh w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100 mb-5'>Daftar Program</h1>
            {isLoading ? (
                <p className="text-neutral9 italic">Loading...</p>
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
                        className="filter-dropdown px-2 py-1 border rounded-md flex-auto mb-2 sm:mb-0"
                        style={{ fontSize: '0.8rem'}}
                    >
                        <option value="">Periode</option>
                        {getFilterOptions().map((option, index) => (
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
                        className="filter-dropdown px-2 py-1 border rounded-md flex-auto mb-2 sm:mb-0"
                        style={{ fontSize: '0.8rem'}}
                    >
                        <option value="">Kelas</option>
                        {getClassFilterOptions().map((option, index) => (
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