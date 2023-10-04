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
  @Input() content: any;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}
