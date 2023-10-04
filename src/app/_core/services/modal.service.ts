import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<any>(null);
  public modal$: Observable<any> = this.modalSubject.asObservable();

  openModal(component: any) {
    this.modalSubject.next(component);
  }

  closeModal() {
    this.modalSubject.next(null);
  }
}
