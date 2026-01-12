import { Component, inject, signal } from '@angular/core';
import { GradeCalculatorComponent } from "../components/grade-calculator/grade-calculator.component";
import { MajorSelectionComponent } from "../components/major-selection/major-selection.component";
import { AuthComponent } from "../components/auth/auth.component";
import { FooterComponent } from "../components/footer/footer.component";
import { UserProfileComponent } from "../components/user-profile/user-profile.component";
import { HeroComponent } from "../components/hero/hero.component";
import { ThemeToggleComponent } from "../components/theme-toggle/theme-toggle.component";
import { ThemeService } from '../services/theme.service';
import { User, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [GradeCalculatorComponent, CommonModule, MajorSelectionComponent, FooterComponent, UserProfileComponent, HeroComponent, ThemeToggleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  themeService = inject(ThemeService)
  userService = inject(UserService)
  showProfile = signal<boolean>(false)
  selectedMajor: string | null = null;
  user: string  = '';

  constructor( 
  ) {}

  ngOnInit() {
   
    
    this.userService.user$.subscribe((user) => {
      this.user = user ? user.name : '';
      
    });
    if (typeof window !== 'undefined') {
      this.userService.loadUserData();
    }
  }
  

  onSelectMajor(major: string) {
    this.selectedMajor = major;
  }

  onReset() {
    this.selectedMajor = null;
  }

  toggleProfile() {
    this.showProfile.set(!this.showProfile())
  }

}
