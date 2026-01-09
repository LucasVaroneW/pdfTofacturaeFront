import { Observable } from 'rxjs';
import { FileEntity } from '../models/file.model';

export interface FileRepository {
    upload(file: File): Observable<FileEntity>;
}
