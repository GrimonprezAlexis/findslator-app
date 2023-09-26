import { StepAnimationService } from './../../_core/services/stepAnimation.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private _stepAnimationService: StepAnimationService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this._stepAnimationService.updateSteps();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this._stepAnimationService.updateSteps();
  }
}
