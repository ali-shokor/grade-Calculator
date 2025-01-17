import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sponsor-card',
  imports: [],
  templateUrl: './sponsor-card.component.html',
  styleUrl: './sponsor-card.component.css'
})
export class SponsorCardComponent {
  @Input() name: string = '';
  @Input() imageSrc: string = '';
}
