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
        title: 'Program 3',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
    {
        id: 5,
        title: 'Program 3',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
    {
        id: 6,
        title: 'Program 3',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },  
    {
        id: 7,
        title: 'Program 3',
        semester: 1,
        academic_year: '2022/2023',
        imageUrl: 'https://via.placeholder.com/300',
    },
    // Add more programs as needed
  ];

const ProgramList = () => {
    return (
        <div className='grid grid-cols-2 gap-4 overflow-y-auto'>
            {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
            ))}
        </div>
    );
}

export default ProgramList;