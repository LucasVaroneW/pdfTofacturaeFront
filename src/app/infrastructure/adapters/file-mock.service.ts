import { Injectable } from '@angular/core';
import { Observable, timer, map, scan, takeWhile, finalize, of, concat } from 'rxjs';
import { FileRepository } from '../../domain/ports/file.repository';
import { FileEntity, UploadStatus } from '../../domain/models/file.model';

@Injectable({
    providedIn: 'root'
})
export class FileMockService implements FileRepository {

    upload(file: File): Observable<FileEntity> {
        const totalSteps = 10;
        const initialEntity: FileEntity = {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'IDLE',
            progress: 0
        };

        // Simulate progress stream
        const progress$ = timer(0, 300).pipe(
            map(i => i + 1), // 1, 2, 3...
            takeWhile(val => val <= totalSteps),
            map(step => {
                const progress = (step / totalSteps) * 100;
                return {
                    ...initialEntity,
                    status: (progress < 100 ? 'UPLOADING' : 'SUCCESS') as UploadStatus,
                    progress: progress,
                    xmlContent: progress === 100 ? this.generateMockXml(file.name) : undefined
                };
            })
        );

        return progress$;
    }

    private generateMockXml(filename: string): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
<invoice>
  <meta>
    <filename>${filename}</filename>
    <convertedAt>${new Date().toISOString()}</convertedAt>
  </meta>
  <content>This is a mock XML content converted from PDF.</content>
</invoice>`;
    }
}
