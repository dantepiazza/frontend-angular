import { Component, OnInit } from '@angular/core';

// Services
import { UiService, SplashData } from 'src/app/platform/services/ui.service';

@Component({
  selector: 'app-ui-splash',
  templateUrl: './ui-splash.component.html',
  styleUrls: ['./ui-splash.component.scss']
})
export class UiSplashComponent implements OnInit {
  public splashInterval: any;
  public splashShow: boolean = false;
  public splashStatus: boolean = true;
  public splashMessage: string;

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.uiService.splash.subscribe((value: SplashData) => {
      clearInterval(this.splashInterval);

      this.splashShow = value.show;
      this.splashStatus = value.status;

      if (this.splashShow) {
        let i = 0;
        const that = this;

        this.splashInterval = setInterval(() => {
          that.splashMessage = value.message[i];

          i = (i < (value.message.length - 1)) ? i + 1 : 0;
        }, 1500);
      } else {
        clearInterval(this.splashInterval);
      }
    });
  }

  onRefresh(): void {
    window.location.reload();
  }
}
