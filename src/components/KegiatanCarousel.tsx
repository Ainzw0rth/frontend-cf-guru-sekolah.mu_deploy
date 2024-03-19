import React from "react";
import { Activity } from "../types/Activity";
import KegiatanCard from "./KegiatanCard";

interface KegiatanCarouselProps {
    kegiatans: Activity[];
}

const KegiatanCarousel: React.FC<KegiatanCarouselProps> = ({ kegiatans }) => {
  return (
    <div className="flex overflow-x-auto">
      {kegiatans.map((kegiatan) => (
        <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />
      ))}
    </div>
  );
};

export default KegiatanCarousel;