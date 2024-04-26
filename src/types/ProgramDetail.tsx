export interface ProgramDetail {
    id: number;
    slug: string;
    judul: string;
    imgUrl: string;
    tujuan: string[];
    kompetensi: string[];
    periode: {
        tahun_ajaran: string;
        semester: string;
    };
    topik: {
        title: string;
        activities: { title: string; url: string }[];
    }[];
}
