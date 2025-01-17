import { Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MajorSelectedService } from '../../services/major-selected.service';

export interface Course {
  id: string
  name: string
  credits: number
}

interface Semester {
  id: string
  name: string
  courses: Course[]
}

interface Majors {
  [key: string]: Semester[];
}

@Component({
  selector: 'app-grade-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './grade-calculator.component.html',
  styleUrl: './grade-calculator.component.css'
})
export class GradeCalculatorComponent {
  
    @Input() major!: string;
    @Output() reset = new EventEmitter<void>();
    majorSelected = inject(MajorSelectedService)

    isButtonDisabled: boolean = true;  // Button initially disabled
    grades: { [key: string]: number } = {};
    result: number | null = null;
    selectedSemester = 'sem1';
    isMIS = true;
  
    majors: Majors = {
      mispe: [
        {
          id: 'sem1',
          name: 'Semester 1',
          courses: [
            { id: 'I1100', name: 'I1100', credits: 3 },
            { id: 'M1100', name: 'M1100', credits: 6 },
            { id: 'P1100', name: 'P1100', credits: 6 },
            { id: 'M1101', name: 'M1101', credits: 6 },
            { id: 'P1101', name: 'P1101', credits: 6 },
            { id: 'S1101', name: 'S1101', credits: 3 },
          ],
        },
        {
          id: 'sem2-mis',
          name: 'Semester 2 (MIS)',
          courses: [
            { id: 'M1102', name: 'M1102', credits: 3 },
            { id: 'M1103', name: 'M1103', credits: 6 },
            { id: 'M1104', name: 'M1104', credits: 6 },
            { id: 'M1105', name: 'M1105', credits: 6 },
            { id: 'M1106', name: 'M1106', credits: 3 },
            { id: 'I1101', name: 'I1101', credits: 6 },
          ],
        },
        {
          id: 'sem2-pe',
          name: 'Semester 2 (PE)',
          courses: [
            { id: 'P1104', name: 'P1104', credits: 3 },
            { id: 'P1105', name: 'P1105', credits: 3 },
            { id: 'P1106', name: 'P1106', credits: 6 },
            { id: 'P1107', name: 'P1107', credits: 6 },
            { id: 'P1108', name: 'P1108', credits: 6 },
            { id: 'P1109', name: 'P1109', credits: 6 },
          ],
        },
      ],
      'bio-chem': [
        {
          id: 'sem1',
          name: 'Semester 1',
          courses: [
            { id: 'B1100', name: 'B1100', credits: 6 },
            { id: 'B1101', name: 'B1101', credits: 3 },
            { id: 'B1102', name: 'B1102', credits: 3 },
            { id: 'C1100', name: 'C1100', credits: 6 },
            { id: 'M1109', name: 'M1109', credits: 6 },
            { id: 'P1104', name: 'P1104', credits: 6 },
          ],
        },
        {
          id: 'sem2',
          name: 'Semester 2',
          courses: [
            { id: 'B1103', name: 'B1103', credits: 3 },
            { id: 'B1105', name: 'B1105', credits: 3 },
            { id: 'C1102', name: 'C1102', credits: 6 },
            { id: 'C1103', name: 'C1103', credits: 6 },
            { id: 'M1111', name: 'M1111', credits: 3 },
            { id: 'P1105', name: 'P1105', credits: 6 },
            { id: 'S1100', name: 'S1100', credits: 3 },
          ],
        },
      ],
    };
  
    constructor(private userService: UserService) {}
    
    // @ViewChildren('semesterButton') buttons!: QueryList<ElementRef<HTMLButtonElement>>;

    // ngAfterViewInit(): void {
    //   // Focus the first button after the view initializes
    //   const firstButton = this.buttons.first;
    //   if (firstButton) {
    //     firstButton.nativeElement.focus();
    //   }
    // }
    updateButtonState() {
      this.isButtonDisabled = !Object.values(this.grades).every(value => value > 0);
    }

    handleGradeChange(courseId: string, value: number) { //Actually this is useless now :p
      if (typeof value === 'string' && value === '') {
        this.grades[courseId] = 0;  // Default to 0 if input is empty
      } else {
        this.grades[courseId] = Number(value);  // Otherwise, use the input value
      }
      this.updateButtonState();
    }
  
    calculateGrade() {
      let totalWeightedGrade = 0;
      let totalCredits = 0;
    
      this.majors[this.major as keyof typeof this.majors].forEach((semester: Semester) => {
        // When Total is selected
        if (this.selectedSemester === 'total') {
          // Include all semesters for bio-chem
          if (
            (this.major === 'bio-chem') ||
            (this.major !== 'bio-chem' &&
              (semester.id === 'sem1' ||
                (this.isMIS && semester.id === 'sem2-mis') ||
                (!this.isMIS && semester.id === 'sem2-pe')))
          ) {
            semester.courses.forEach((course) => {
              if (this.grades[course.id]) {
                totalWeightedGrade += this.grades[course.id] * course.credits;
                totalCredits += course.credits;
              }
            });
          }
        } else if (this.selectedSemester === semester.id) {
          semester.courses.forEach((course) => {
            if (this.grades[course.id]) {
              totalWeightedGrade += this.grades[course.id] * course.credits;
              totalCredits += course.credits;
            }
          });
        }
      });
    
      const averageGrade = totalCredits > 0 ? totalWeightedGrade / totalCredits : 0;
      this.result = parseFloat(averageGrade.toFixed(2));
      this.userService.saveGrade(averageGrade, this.selectedSemester === 'total' ? averageGrade : null, this.major);
    }
    
  
    handleSemesterChange(semester: string) {

      this.selectedSemester = semester;
      this.result = null;
    }
  
    handleMISPESwitch() {
      this.isMIS = !this.isMIS;
      this.grades = {};
      this.result = null;
    }
  
    onReset() {
      this.selectedSemester = 'sem1';
      this.majorSelected.major.set(false);
      this.result = null;
      this.reset.emit();
    }

    isFormValid(): boolean {
      // Check if the selected semester and major exist
      if (!this.selectedSemester || !this.majors[this.major]) {
        return false;
      }
    
      // Find the courses for the selected semester or 'total'
      const semesterCourses = this.majors[this.major].find(
        (semester) => semester.id === this.selectedSemester || this.selectedSemester === 'total'
      )?.courses;
    
      if (!semesterCourses) {
        return false;
      }
    
      // Ensure all grades are non-empty, valid numbers, and within the acceptable range
      return semesterCourses.every(
        (course) =>
          this.grades[course.id] !== undefined && // Grade exists
          this.grades[course.id] !== null &&     // Grade is not null
          !isNaN(this.grades[course.id]) &&      // Grade is a valid number
          this.grades[course.id] >= 0 &&         // Grade is within the range
          this.grades[course.id] <= 100
      );
    }
    
    
  }
  
