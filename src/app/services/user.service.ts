import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  // email: string;
}

export interface Grade {
  semester: string;
  grade: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private gradesSubject = new BehaviorSubject<Grade[]>([]);
  grades$ = this.gradesSubject.asObservable();

  get user() {
    return this.userSubject.value;
  }

  get grades() {
    return this.gradesSubject.value;
  }

  loadUserData() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
      const storedGrades = localStorage.getItem('grades');
      if (storedGrades) {
        this.gradesSubject.next(JSON.parse(storedGrades));
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }

  login(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  updateUser(updatedUser: User) {
    this.userSubject.next(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  saveGrade(semesterGrade: number, totalGrade: number | null, selectedMajor: string) {
    const newGrades = [...this.grades];
    const semesterName = selectedMajor === 'mispe' ? 'MISP' : 'csvt';
    const semester = totalGrade ? 'Total' : `Semester ${newGrades.length + 1}`;
    const gradeToSave = totalGrade || semesterGrade;

    newGrades.push({ semester: `${semesterName} - ${semester}`, grade: gradeToSave });
    this.gradesSubject.next(newGrades);
    localStorage.setItem('grades', JSON.stringify(newGrades));
  }

  deleteGrade(semester: string) {
    const newGrades = this.grades.filter((grade) => grade.semester !== semester);
    this.gradesSubject.next(newGrades);
    localStorage.setItem('grades', JSON.stringify(newGrades));
  }
}
