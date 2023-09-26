import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() type!: 'success' | 'warning' | 'error';
  @Input() message!: string;
  @Input() isVisible: boolean = true;

  ngOnInit() {
    if (this.isVisible) {
      setTimeout(() => {
        this.isVisible = false;
      }, 10000); // 10 seconds
    }
  }
}
