import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<any>(null);
  public modal$: Observable<any> = this.modalSubject.asObservable();

  openModal(component: any, title?: string) {
    this.modalSubject.next({ component, title });
  }

  closeModal() {
    this.modalSubject.next(null);
  }
}
