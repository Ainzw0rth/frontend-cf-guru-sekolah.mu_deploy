import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export interface PdfViewerProps {
    contentUrl: string;
}

const PdfViewer = (props: PdfViewerProps) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <div className="aspect-video w-full">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={props.contentUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
        </div>
    );
}

export default PdfViewer;