import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  iif,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { GiphyService } from '../../services';

@Component({
  selector: 'ultr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  search: FormControl = new FormControl();
  page$: BehaviorSubject<number> = new BehaviorSubject(1);

  trending$ = this.page$.pipe(
    switchMap((page) => this.giphyService.getTrending(page))
  );
  searchValue$ = this.search.valueChanges.pipe(
    debounceTime(300),
    shareReplay(),
    tap(() => this.page$.next(1))
  );
  searchGifs$ = combineLatest([this.searchValue$, this.page$]).pipe(
    switchMap(([value, page]) => this.giphyService.searchGifs(value, page))
  );

  gifs$ = this.searchValue$.pipe(
    startWith(null),
    switchMap((value) => iif(() => !!value, this.searchGifs$, this.trending$))
  );

  constructor(private giphyService: GiphyService) {}
}
