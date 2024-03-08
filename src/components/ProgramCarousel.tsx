import React from "react";
import ProgramCard from "./ProgramCard";
import { Program } from "../types/Program";

interface ProgramCarouselProps {
    programs: Program[];
  }
  
  const ProgramCarousel: React.FC<ProgramCarouselProps> = ({ programs }) => {
    return (
      <div className="flex overflow-x-auto">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    );
  };

export default ProgramCarousel;