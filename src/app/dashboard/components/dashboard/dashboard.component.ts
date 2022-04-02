import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GiphyService } from '../../services';

@Component({
  selector: 'ultr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  trending$ = this.giphyService.getTrending();

  constructor(private giphyService: GiphyService) {}
}
