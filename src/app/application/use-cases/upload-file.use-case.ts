import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FileRepository } from '../../domain/ports/file.repository';
import { FileEntity } from '../../domain/models/file.model';

@Injectable({
    providedIn: 'root'
})
export class UploadFileUseCase {
    constructor(@Inject('FileRepository') private fileRepository: FileRepository) { }

    execute(file: File): Observable<FileEntity> {
        // Here we could add domain validation logic (e.g. check file size/type before calling repo)
        return this.fileRepository.upload(file);
    }
}
