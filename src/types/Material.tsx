export interface ContentData {
    title : string;
    type : string;
    contentData : string;
}

export interface ContentReference {
    title : string;
    contentUrl : string;
}

export interface MaterialData {
    material : ContentReference[];
}

export enum ContentType {
    PDF = 1,
    EMBED = 2,
}