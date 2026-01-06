import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent {
  // Using Signals for reactivity as requested
  isVisible = signal(true);

  accept() {
    this.isVisible.set(false);
    // Logic to save to localStorage will go in Domain/Application layer later
  }
}
