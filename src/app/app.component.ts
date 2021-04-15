import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';

// Services
import { UiService } from './platform/services/ui.service';
import { PlatformService } from './platform/services/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  public interfase: boolean;
  public screen: any;

  constructor(
    private location: Location,
    private uiService: UiService,
    private platformService: PlatformService,
  ) {
    this.uiService.interfaseSet(true);

    this.platformService.screen.subscribe(params => {
      this.screen = params;
    });

    this.uiService.interfaseShow.subscribe((config) => {
      this.interfase = config;
    });
  }

  ngAfterViewInit(): void {
    this.uiService.sidenavSet(this.sidenav);
  }

  ngOnInit(): void { }

  /**
   * Detect screen resizing to configure interface
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.platformService.onWindowResize(event);
  }

  /**
   * Executed when the GO_BACK event is received.
   */
   onBackPressed(): void {
    if (this.sidenav && this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.location.back();
    }
  }
}
