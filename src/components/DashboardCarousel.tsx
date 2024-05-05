import React from "react";
import DashboardCard from "./DashboardCard";
import { Murid } from "../types/Murid";

interface DashboardCarouselProps {
  students: Murid[];
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ students }) => {
    return (
        <div className="flex overflow-x-auto">
        {students.length === 0 ? (
            <div className="flex items-center justify-center w-full h-40">
                <p className="text-lg">Murid tidak ditemukan </p>
            </div>
        ) : (
            students.map((student) => (
            <DashboardCard key={student.id} studentData={student} type={1} />
            ))
        )}
        </div>
    );
};

export default DashboardCarousel;
