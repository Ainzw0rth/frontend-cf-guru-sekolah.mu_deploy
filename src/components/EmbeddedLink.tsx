interface EmbeddedLinkProps {
    width? : number;
    height? : number;
    src : string;
}

const EmbeddedLink = (props : EmbeddedLinkProps) => {
    console.log(props); 
    return (
        <div className="flex justify-center">
            <iframe
                className="aspect-video w-full"
                width={props.width}
                height={props.height}
                src={props.src}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}

export default EmbeddedLink;