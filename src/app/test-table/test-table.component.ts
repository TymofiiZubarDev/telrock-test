import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  DynamicKeysObjectOfStrings,
  TableRow,
  TableRowsObject,
} from '@test-table/interfaces/test-table.interfaces';
import { CustomDropDownService } from '@test-table/services/custom-drop-down.service';
import { TestTableService } from '@test-table/services/test-table.service';
import {
  selectSelectedGroup,
  selectSelectedItems,
} from '@test-table/store/selected-items/selected-items.selectors';
import { generateTableRowsArray } from '@test-table/utils/test-table.functions';
import { extractTableRowsObject } from '@test-table/utils/extract-table-rows.operator';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['test-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableComponent implements OnInit {
  public selectMeasurementItems$!: Observable<string[]>;
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public tableRows$ = new BehaviorSubject<TableRow[]>([]);
  public selectGroupItems$: Observable<string[]> =
    this.customDropDownService.getGroups();

  private selectedGroup$: Observable<string> =
    this.store.select(selectSelectedGroup);
  private selectedItems!: DynamicKeysObjectOfStrings;

  constructor(
    private customDropDownService: CustomDropDownService,
    private store: Store,
    private testTableService: TestTableService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.selectedGroup$
      .pipe(
        tap((selectedGroup: string) => {
          this.selectMeasurementItems$ =
            this.customDropDownService.getMeasurements(selectedGroup);
        })
      )
      .subscribe();
    this.store
      .select(selectSelectedItems)
      .pipe(
        tap((selectedItems: DynamicKeysObjectOfStrings) => {
          this.selectedItems = selectedItems;
        })
      )
      .subscribe();
    this.run();
  }

  public run(): void {
    this.tableRows$.next([]);
    this.isLoading$.next(true);
    this.testTableService
      .getTableData(this.selectedItems)
      .pipe(
        extractTableRowsObject,
        tap((tableRowsObject: TableRowsObject) => {
          this.tableRows$.next(generateTableRowsArray(tableRowsObject));
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  public rowClassCallback = (context: RowClassArgs) => {
    if (context.index % 2 === 0) {
      return { 'light-gray': true };
    } else return { transparent: true };
  };

  public colorCode(dataItemValue: string): SafeStyle {
    let result = 'lightgreen';
    const percent = Number(dataItemValue.split(' ')[0]);
    if (percent < 80) {
      result = 'yellow';
    }
    if (percent < 60) {
      result = 'orangered';
    }
    return this.sanitizer.bypassSecurityTrustStyle(result);
  }
}
