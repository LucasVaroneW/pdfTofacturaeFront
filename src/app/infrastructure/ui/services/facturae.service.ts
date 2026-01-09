import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FacturaeService {
    // In development, we use the proxy configuration or full URL if CORS is allowed.
    // In production (Nginx), this relative path will be proxied.
    private apiUrl = '/api/v1/facturae/convert-pdf';

    constructor(private http: HttpClient) { }

    convertPdf(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);

        // We expect text/xml response, so we set responseType to 'text'
        // Auth is now handled by Nginx proxy
        return this.http.post(this.apiUrl, formData, {
            responseType: 'text'
        });
    }
}
