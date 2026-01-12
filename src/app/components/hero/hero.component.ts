import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  theme = inject(ThemeService)
  isDark = signal(this.theme.isDarkMode);
  @Output() pressed = new EventEmitter();

  toggleProfile() {
    this.pressed.emit();
  }
}
