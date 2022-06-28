import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';

import { TestTableComponent } from '@test-table/test-table.component';
import { CustomToolDropDownListComponent } from '@test-table/components/custom-tool-drop-down-list/custom-tool-drop-down-list.component';
import { CustomDropDownService } from '@test-table/services/custom-drop-down.service';
import { testTableNode } from '@test-table/store/constants/test-table';
import { reducers } from '@test-table/store';
import { TestTableService } from '@test-table/services/test-table.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TestTableComponent, CustomToolDropDownListComponent],
  providers: [CustomDropDownService, TestTableService],
  imports: [
    CommonModule,
    GridModule,
    ToolBarModule,
    DropDownsModule,
    DialogsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature(testTableNode, reducers, {}),
  ],
  exports: [TestTableComponent],
})
export class TestTableModule {}
