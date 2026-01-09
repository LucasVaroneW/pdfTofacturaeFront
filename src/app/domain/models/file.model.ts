export type UploadStatus = 'IDLE' | 'UPLOADING' | 'SUCCESS' | 'ERROR';

export interface FileEntity {
    id: string;
    name: string;
    size: number;
    type: string;
    status: UploadStatus;
    progress: number;
    xmlContent?: string;
    errorMessage?: string;
}
