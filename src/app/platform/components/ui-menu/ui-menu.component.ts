import { Component, OnInit } from '@angular/core';

// Services
import { UiService } from 'src/app/platform/services/ui.service';
import { PlatformService } from 'src/app/platform/services/platform.service';

@Component({
  selector: 'app-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss']
})
export class UiMenuComponent implements OnInit {
  public interfase: boolean;
  public screen: any;

  constructor(
    private uiService: UiService,
    private platformService: PlatformService,
  ) {
    this.platformService.screen.subscribe(params => {
      this.screen = params;
    });

    this.uiService.interfaseShow.subscribe((config) => {
      this.interfase = config;
    });
  }

  ngOnInit(): void { }
}
