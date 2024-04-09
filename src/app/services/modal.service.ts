import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStateMap = new Map<string, BehaviorSubject<boolean>>();

  constructor() {}

  toggleModal(modalName: string): void {
    const modalState = this.getModalStateSubject(modalName);
    modalState.next(!modalState.value);
  }

  openModal(modalName: string): void {
    const modalState = this.getModalStateSubject(modalName);
    modalState.next(true);
  }

  closeModal(modalName: string): void {
    const modalState = this.getModalStateSubject(modalName);
    modalState.next(false);
  }

  getModalState(modalName: string): Observable<boolean> {
    return this.getModalStateSubject(modalName).asObservable();
  }

  private getModalStateSubject(modalName: string): BehaviorSubject<boolean> {
    if (!this.modalStateMap.has(modalName)) {
      this.modalStateMap.set(modalName, new BehaviorSubject<boolean>(false));
    }
    return this.modalStateMap.get(modalName)!;
  }
}
