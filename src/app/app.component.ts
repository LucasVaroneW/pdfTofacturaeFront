import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacturaeService } from './infrastructure/ui/services/facturae.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-to-xml-converter';

  constructor(private facturaeService: FacturaeService) {
    // Ping backend immediately to wake it up (Render cold start)
    this.facturaeService.pingBackend().subscribe({
      next: (response) => console.log('Backend ping successful:', response),
      error: (err) => console.log('Backend ping failed (might be starting up...):', err)
    });
  }
}
