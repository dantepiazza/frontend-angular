import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/platform/services/ui.service';

@Component({
  selector: 'app-ui-spinner',
  templateUrl: './ui-spinner.component.html',
  styleUrls: ['./ui-spinner.component.scss']
})
export class UiSpinnerComponent implements OnInit {
  public spinnerShow: boolean = false;

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.uiService.spinner.subscribe((value) => {
      this.spinnerShow = value;
    });
  }
}
