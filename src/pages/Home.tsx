import homeBackground from '../assets/home_background.png';
import { Program } from '../types/Program';
import ProgramCarousel from '../components/ProgramCarousel';

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
    // Add more programs as needed
  ];

const Home = () => {
    return (
        <div className='bg-neutral8 bg-fixed bg-bottom bg-no-repeat h-svh w-full flex-col justify-center items-center p-5' style={{backgroundImage: `url(${homeBackground})`}}>
            <h1 className='font-bold text-program-title text-text-100'>Program</h1>
            <ProgramCarousel programs={programs} />
        </div>
    );
}

export default Home;