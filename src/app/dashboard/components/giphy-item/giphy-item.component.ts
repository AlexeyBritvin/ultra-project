import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ultr-giphy-item',
  templateUrl: './giphy-item.component.html',
  styleUrls: ['./giphy-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphyItemComponent {
  @Input() source: string = '';
  constructor() {}
}
