import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import { LoaderComponent } from '@shared/components/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  providers: [],
  imports: [CommonModule, IndicatorsModule],
  exports: [LoaderComponent],
})
export class SharedModule {}
