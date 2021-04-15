import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

// Modules
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/platform/material.module';
import { UiModule } from 'src/app/platform/ui.module';
import { PlatformModule } from 'src/app/platform/platform.module';

// Services
import { UiService } from 'src/app/platform/services/ui.service';
import { InterceptorService } from 'src/app/platform/services/interceptor.service';

// Components
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    UiModule,
    PlatformModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
