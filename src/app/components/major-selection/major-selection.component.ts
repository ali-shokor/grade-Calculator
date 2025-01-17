import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MajorSelectedService } from '../../services/major-selected.service';

@Component({
  selector: 'app-major-selection',
  imports: [],
  templateUrl: './major-selection.component.html',
  styleUrl: './major-selection.component.css'
})
export class MajorSelectionComponent {
  majorSelected = inject(MajorSelectedService)
  @Output() selectMajor = new EventEmitter<string>();

  majors = [
    { id: 'mispe', name: 'MISPE' },
    { id: 'bio-chem', name: 'Bio-Chem' },
  ];

  onSelectMajor(majorId: string) {
    this.majorSelected.major.set(true);
    this.selectMajor.emit(majorId);
  }

}
