import { Component, OnInit } from '@angular/core';

// Services
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-ui-toolbar',
  templateUrl: './ui-toolbar.component.html',
  styleUrls: ['./ui-toolbar.component.scss']
})
export class UiToolbarComponent implements OnInit {
  public options = {
    show: false,
    hasHeader: false,
    menuButtonShow: true,
    title: 'Menu'
  };

  constructor(
    private uiService: UiService,
  ) {
    this.uiService.interfaseShow.subscribe((config) => {
      this.options.show = config;
    });

    this.uiService.toolbarTitle.subscribe((title) => {
      this.options.title = title;
    });
  }

  ngOnInit(): void { }

  onMenuToggle(): void {
    this.uiService.sidenavShow(!this.uiService.sidenav.opened);
  }
}
