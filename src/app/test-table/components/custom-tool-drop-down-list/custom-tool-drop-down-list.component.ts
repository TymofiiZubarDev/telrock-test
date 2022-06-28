import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnInit,
  forwardRef,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';


import { setSelectedItemAction } from '@test-table/store/selected-items/selected-items.actions';

@Component({
  providers: [
    {
      provide: ToolBarToolComponent,
      useExisting: forwardRef(() => CustomToolDropDownListComponent),
    },
  ],
  selector: 'custom-drop-down-list',
  templateUrl: './custom-tool-drop-down-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./custom-tool-drop-down-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomToolDropDownListComponent extends ToolBarToolComponent implements OnInit, OnChanges {
  @Input() public text!: string;
  @Input() public name!: string;
  @Input() public items: Array<string> = [];

  @ViewChild('toolbarTemplate', { static: true })
  public override toolbarTemplate!: TemplateRef<unknown>;
  @ViewChild('toolbarElement', { static: false })
  public toolbarElement!: ElementRef;
  @ViewChild('dropdownlist', { read: DropDownListComponent, static: false })
  public dropdownlist!: DropDownListComponent;

  public opened = false;
  public tabindex = -1;
  public itemDisabled!: (itemArgs: {
    dataItem: string;
    index: number;
  }) => boolean;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.itemDisabled = () =>
      !this.overflows && this.dropdownlist && !this.dropdownlist.isOpen;
  }

  ngOnChanges(): void {
    this.items[0] && this.store.dispatch(setSelectedItemAction({ [this.name]: this.items[0] }));
  }

  public changeSelectedGroup(selectedItem: string): void {
    this.store.dispatch(setSelectedItemAction({ [this.name]: selectedItem }));
  }
}
