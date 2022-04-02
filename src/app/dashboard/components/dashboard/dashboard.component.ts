import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, iif, shareReplay, startWith, switchMap } from 'rxjs';
import { GiphyService } from '../../services';

@Component({
  selector: 'ultr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  search: FormControl = new FormControl();

  trending$ = this.giphyService.getTrending();
  searchValue$ = this.search.valueChanges.pipe(
    debounceTime(300),
    shareReplay()
  );
  searchGifs$ = this.searchValue$.pipe(
    switchMap((value) => this.giphyService.searchGifs(value))
  );

  gifs$ = this.searchValue$.pipe(
    startWith(null),
    switchMap((value) => iif(() => !!value, this.searchGifs$, this.trending$))
  );

  constructor(private giphyService: GiphyService) {}
}
