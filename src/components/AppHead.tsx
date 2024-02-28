import sekolahmuHorizontal from '../assets/sekolahmu_horizontal.png';

const AppHead = () => {
    return (
        <header>
            <div className="w-full h-20 flex justify-center items-center shadow-medium fixed z-50 bg-white">
                <img src={sekolahmuHorizontal} alt="Sekolahmu" className="h-10" />
            </div>
            <div className="h-20"/> {/* whitespace for next component */}
        </header>
    );
}

export default AppHead;