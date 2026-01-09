import { Component } from '@angular/core';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { DropZoneComponent } from '../../components/drop-zone/drop-zone.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaqSectionComponent, DropZoneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { }
