import {ChangeEvent, KeyboardEvent, useState} from 'react';
import ProgramCard from "../components/ProgramCard";
import { Program } from "../types/Program";

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
    // Add more programs as needed
  ];

const ProgramList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState(programs);
    const [filterValue, setFilterValue] = useState("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchClick = () => {
        filterPrograms(searchTerm);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            filterPrograms(searchTerm);
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value);
        if (e.target.value === ''){
            filterPrograms(searchTerm, '');
        } else {
            filterPrograms(searchTerm, e.target.value);
        }
    }

    const filterPrograms = (searchValue: string, filterValue?: string) => {
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

    return (
        <div className='bg-neutral8 h-svh w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100 mb-5'>Daftar Program</h1>
            <div className="flex mb-5">
                <input
                    type="text"
                    placeholder="Cari Judul Program"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 mr-2"
                    style={{ border: "1px solid #1890ff", borderRadius: "8px", paddingLeft: "10px", marginRight: "8px" }}
                />
                <button onClick={handleSearchClick}           className="bg-persian-blue-500 text-white py-3 rounded-md w-20 text-label-5 font-semibold">
                    Cari
                </button>
            </div>
            <div className="mb-5">
                <select value={filterValue} onChange={handleFilterChange} className="px-3 py-2 border rounded-md">
                    <option value="">Periode</option>
                        {getFilterOptions().map((option, index) => (
                        <option key={index} value={option}>
                        {option}
                    </option>
                ))}
                </select>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto'>
                {filteredPrograms.map((program) => (
                    <div key={program.id} className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <ProgramCard program={program} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgramList;