import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileUseCase } from '../../../application/use-cases/upload-file.use-case';
import { ToastService } from '../../services/toast.service';
import { FileEntity } from '../../../domain/models/file.model';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-zone.component.html',
  styleUrl: './drop-zone.component.css'
})
export class DropZoneComponent {
  private uploadUseCase = inject(UploadFileUseCase);
  private toastService = inject(ToastService);

  // Component State
  fileState = signal<FileEntity | null>(null);

  isDragging = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    // 1. Basic Validation (Logic Validation should be in Domain, but simple checks here are OK for UX)
    if (file.type !== 'application/pdf') {
      this.toastService.show('Only PDF files are allowed', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      this.toastService.show('File is too large (Max 10MB)', 'error');
      return;
    }

    // 2. Execute Use Case
    this.uploadUseCase.execute(file).subscribe({
      next: (entity: FileEntity) => {
        this.fileState.set(entity);
        if (entity.status === 'SUCCESS') {
          this.toastService.show('Conversion completed successfully!', 'success');
        }
      },
      error: (err: unknown) => {
        this.toastService.show('Upload failed. Please try again.', 'error');
        console.error(err);
      }
    });
  }

  reset() {
    this.fileState.set(null);
  }
}

