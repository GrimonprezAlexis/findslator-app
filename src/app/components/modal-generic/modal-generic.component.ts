import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef,
  Input,
} from '@angular/core';
import { ModalService } from '../../_core/services/modal.service';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss'],
})
export class ModalGenericComponent {
  modalData: any = {}; // Store component and title

  constructor(private modalService: ModalService) {
    this.modalService.modal$.subscribe((data) => {
      this.modalData = data;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
