import React from "react";
import { Activity } from "../types/Activity";
import KegiatanPendingTaskCard from "./KegiatanPendingTaskCard";

interface KegiatanCarouselProps {
    kegiatans: Activity[];
}

const KegiatanPendingTaskCarousel: React.FC<KegiatanCarouselProps> = ({ kegiatans }) => {
  return (
    <div className="flex overflow-x-auto">
      {kegiatans.length === 0 ? (
        <div className="flex items-center justify-center w-full h-40">
          <p className="text-lg">Bagus! Tidak ada tugas tertunda </p>
        </div>
      ) : (
        kegiatans.map((kegiatan) => (
          <KegiatanPendingTaskCard key={kegiatan.id} kegiatan={kegiatan} />
        ))
      )}
    </div>
  );
};

export default KegiatanPendingTaskCarousel;
