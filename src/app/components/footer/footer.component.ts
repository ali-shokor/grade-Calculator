import { Component } from '@angular/core';
import { kStringMaxLength } from 'node:buffer';
import { SponsorCardComponent } from "../../sponsor-card/sponsor-card.component";

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  openLink(url: string) {
    window.open(url, '_blank');
  }
  // openInstaLink(): void {
  //   const url = 'https://instagram.com';
  //   window.open(url, '_blank');
  // }

  // openLinkInLink(): void {
  //   const url = 'https://www.linkedin.com/in/ali-shokor-b961aa344/';
  //   window.open(url, '_blank');
  // }

  // openGitHubLink(): void {
  //   const url = 'https://github.com/ali-shokor';
  //   window.open(url, '_blank');
  // }

  // openYoutubeLink(): void {
  //   const url = 'https://www.youtube.com/@AliShokor01';
  //   window.open(url, '_blank');
  // }
}
