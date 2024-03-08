import React from "react";
import { Kegiatan } from "../types/Kegiatan";
import KegiatanCard from "./KegiatanCard";

interface KegiatanCarouselProps {
    kegiatans: Kegiatan[];
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