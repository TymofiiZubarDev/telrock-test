import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import {
  LoaderType,
  LoaderThemeColor,
  LoaderSize,
} from '@progress/kendo-angular-indicators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() type = 'infinite-spinner';
  @Input() size = 'medium';
  @Input() themeColor = 'info';

  public loader = {
    type: <LoaderType>this.type,
    themeColor: <LoaderThemeColor>this.themeColor,
    size: <LoaderSize>this.size,
  };
}
