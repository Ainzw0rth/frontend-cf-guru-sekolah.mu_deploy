import React from "react";
import { Activity } from "../types/Activity";
import KegiatanPendingTaskCard from "./KegiatanPendingTaskCard";

interface KegiatanCarouselProps {
    kegiatans: Activity[];
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