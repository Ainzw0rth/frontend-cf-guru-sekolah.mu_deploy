const ProgramBanner = (props : {imgUrl : string, judul : string}) => {
    return (
        <div>
            <img 
                src={props.imgUrl} 
                alt={`Banner ${props.judul}`}
                className="w-full h-60 object-cover"
            />
            <div className="w-fit bg-cobalt6 px-5 py-2 shadow-medium -translate-y-1/2 z-20">
                <h1 className="font-bold text-program-title text-text-100">{props.judul}</h1>
            </div>
        </div>
    );
}

export default ProgramBanner;