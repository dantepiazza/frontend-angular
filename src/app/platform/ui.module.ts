import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { MaterialModule } from 'src/app/platform/material.module';

// Services
import { UiService } from 'src/app/platform/services/ui.service';
import { UserService } from 'src/app/platform/services/user.service';
import { AuthenticationService } from 'src/app/platform/services/authentication.service';

// Components
import { UiToolbarComponent } from 'src/app/platform/components/ui-toolbar/ui-toolbar.component';
import { UiMenuComponent } from 'src/app/platform/components/ui-menu/ui-menu.component';
import { UiSpinnerComponent } from 'src/app/platform/components/ui-spinner/ui-spinner.component';
import { UiSplashComponent } from 'src/app/platform/components/ui-splash/ui-splash.component';
import { UiDialogComponent } from 'src/app/platform/components/ui-dialog/ui-dialog.component';
import { UiOverlayComponent } from 'src/app/platform/components/ui-overlay/ui-overlay.component';

@NgModule({
  declarations: [
    UiToolbarComponent,
    UiMenuComponent,
    UiSpinnerComponent,
    UiSplashComponent,
    UiDialogComponent,
    UiOverlayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    UiToolbarComponent,
    UiMenuComponent,
    UiSpinnerComponent,
    UiSplashComponent,
    UiToolbarComponent,
  ],
  providers: [UiService, UserService, AuthenticationService]
})

export class UiModule { }
