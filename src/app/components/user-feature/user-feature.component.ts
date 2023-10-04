import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-feature',
  templateUrl: './user-feature.component.html',
  styleUrls: ['./user-feature.component.scss'],
})
export class UserFeatureComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: string | undefined;

  constructor() {}

  ngOnInit() {}
}
