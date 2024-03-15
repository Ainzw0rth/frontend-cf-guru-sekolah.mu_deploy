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

    const filterPrograms = (searchValue: string) => {
        const filtered = programs.filter(program => 
            program.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredPrograms(filtered);
    };

    return (
        <div className='bg-neutral8 h-svh w-full justify-center items-center p-10'>
            <h1 className='font-bold text-program-title text-text-100'>Daftar Program</h1>
            <div className="flex mb-5">
                <input
                    type="text"
                    placeholder="Cari Program"
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto'>
        {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}

export default ProgramList;