import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepAnimationService {
  constructor() {}

  updateSteps() {
    const firstStep = document.getElementById('step1');
    const secondStep = document.getElementById('step2');
    const thirdStep = document.getElementById('step3');

    if (!firstStep || !secondStep || !thirdStep) {
      return; // Elements not found, exit function
    }

    const scrollPosition = window.scrollY;

    if (scrollPosition < firstStep.offsetTop) {
      this.updateStepStatus('step2', true);
      this.updateStepStatus('step3', true);
      this.updateStepStatus('step1', false);
    } else if (
      scrollPosition > secondStep.offsetTop - 300 &&
      scrollPosition < thirdStep.offsetTop - 400
    ) {
      this.updateStepStatus('step1', true);
      this.updateStepStatus('step3', true);
      this.updateStepStatus('step2', false);
    } else if (scrollPosition > thirdStep.offsetTop - 400) {
      this.updateStepStatus('step1', true);
      this.updateStepStatus('step2', true);
      this.updateStepStatus('step3', false);
    }
  }

  private updateStepStatus(stepId: string, disable: boolean) {
    const stepLinks = document.querySelectorAll(`a[href$="#${stepId}"] li`);
    stepLinks.forEach((link) => {
      if (disable) {
        link.classList.add('disabled');
      } else {
        link.classList.remove('disabled');
      }
    });
  }
}
