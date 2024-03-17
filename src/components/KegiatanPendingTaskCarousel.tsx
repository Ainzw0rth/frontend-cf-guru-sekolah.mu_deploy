import React from "react";
import { Kegiatan } from "../types/Kegiatan";
import KegiatanPendingTaskCard from "./KegiatanPendingTaskCard";

interface KegiatanCarouselProps {
    kegiatans: Kegiatan[];
}

const KegiatanPendingTaskCarousel: React.FC<KegiatanCarouselProps> = ({ kegiatans }) => {
  return (
    <div className="flex overflow-x-auto">
      {kegiatans.map((kegiatan) => (
        <KegiatanPendingTaskCard key={kegiatan.id} kegiatan={kegiatan} />
      ))}
    </div>
  );
};

export default KegiatanPendingTaskCarousel;