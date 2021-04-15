import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/platform/material.module';
import { PlatformService } from 'src/app/platform/services/platform.service';
import { LocalStorageService } from 'src/app/platform/services/local-storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [PlatformService, LocalStorageService]
})
export class PlatformModule { }