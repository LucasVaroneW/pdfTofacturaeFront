import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaeService } from '../../services/facturae.service';

@Component({
    selector: 'app-converter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './converter.component.html',
    styles: []
})
export class ConverterComponent {
    isDragging = false;
    isLoading = false;
    xmlResult: string | null = null;
    error: string | null = null;
    fileName: string | null = null;

    constructor(private facturaeService: FacturaeService) { }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        if (event.dataTransfer?.files.length) {
            this.handleFile(event.dataTransfer.files[0]);
        }
    }

    onFileSelected(event: any) {
        if (event.target.files.length) {
            this.handleFile(event.target.files[0]);
        }
    }

    handleFile(file: File) {
        if (file.type !== 'application/pdf') {
            this.error = 'Por favor, sube un archivo PDF válido.';
            return;
        }

        this.fileName = file.name;
        this.isLoading = true;
        this.error = null;
        this.xmlResult = null;

        this.facturaeService.convertPdf(file).subscribe({
            next: (response: string) => {
                this.isLoading = false;
                this.xmlResult = response;
            },
            error: (err: any) => {
                this.isLoading = false;
                console.error('Error converting PDF:', err);
                this.error = 'Hubo un error al convertir el PDF. Asegúrate de que el backend esté funcionando.';
            }
        });
    }

    copyToClipboard() {
        if (this.xmlResult) {
            navigator.clipboard.writeText(this.xmlResult).then(() => {
                // Optional: show toast
                alert('Copiado al portapapeles');
            });
        }
    }

    downloadXml() {
        if (this.xmlResult) {
            const blob = new Blob([this.xmlResult], { type: 'text/xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = (this.fileName || 'factura') + '.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    }

    reset() {
        this.fileName = null;
        this.xmlResult = null;
        this.error = null;
    }
}
