import React from "react";
import ProgramCard from "./ProgramCard";
import { Program } from "../types/Program";

interface ProgramCarouselProps {
  programs: Program[];
}

const ProgramCarousel: React.FC<ProgramCarouselProps> = ({ programs }) => {
  return (
    <div className="flex overflow-x-auto">
      {programs.length === 0 ? (
        <div className="flex items-center justify-center w-full h-40">
            <p className="text-lg">Tidak ada program terdaftar </p>
        </div>
      ) : (
        programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))
      )}
    </div>
  );
};

export default ProgramCarousel;
