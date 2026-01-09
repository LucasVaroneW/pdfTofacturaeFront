import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FacturaeService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    convertPdf(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.apiUrl, formData, {
            responseType: 'text'
        });
    }
}
