import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MajorSelectedService {

  constructor() { }
  major = signal<boolean>(false)
}
