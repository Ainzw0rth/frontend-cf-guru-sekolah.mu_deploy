export interface ContentReference {
    title : string;
    contentUrl : string;
    type : "pdf" | "embed";
}

export type MaterialData = ContentReference[];