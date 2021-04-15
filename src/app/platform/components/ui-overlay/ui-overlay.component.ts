import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ui-overlay',
  templateUrl: './ui-overlay.component.html',
  styleUrls: ['./ui-overlay.component.scss'],
  animations: [
    trigger('fade', [
      state('true', style({
        opacity: '1',
        visibility: 'visible'
      })),
      state('false', style({
        opacity: '0',
        visibility: 'hidden'
      })),
      transition('true => false', animate('200ms ease-in-out')),
      transition('false => true', animate('200ms ease-in-out')),
    ]),
  ]
})
export class UiOverlayComponent implements OnInit {
  @Input() show: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
}
