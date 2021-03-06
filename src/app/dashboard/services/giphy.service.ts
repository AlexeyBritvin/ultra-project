import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Environment, IEnvironment } from '../../tokens';
import { Giphy, GiphyResponse } from '../models';
import { PAGE_SIZE } from './page-size';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private readonly url = this.env.giphyApiUrl;
  private params = {
    api_key: this.env.giphyApiKey,
    limit: PAGE_SIZE,
  };

  constructor(
    private http: HttpClient,
    @Inject(Environment) private env: IEnvironment
  ) {}

  private calcOffset(page: number): number {
    return (page - 1) * PAGE_SIZE;
  }

  private mapGiphyItem({ id, images, title }: Record<string, any>): Giphy {
    return {
      id,
      source: images.original.mp4,
      title,
    };
  }

  getTrending(page: number = 0): Observable<GiphyResponse> {
    return this.http
      .get<GiphyResponse>(`${this.url}/trending`, {
        params: { ...this.params, offset: this.calcOffset(page) },
      })
      .pipe(
        map(({ data, pagination }) => {
          return {
            pagination,
            data: data.map((item) => this.mapGiphyItem(item)),
          };
        }),
        catchError(() => EMPTY)
      );
  }

  searchGifs(query: string, page: number = 0): Observable<GiphyResponse> {
    return this.http
      .get<GiphyResponse>(`${this.url}/search`, {
        params: { ...this.params, q: query, offset: this.calcOffset(page) },
      })
      .pipe(
        map(({ data, pagination }) => {
          return {
            pagination,
            data: data.map((item) => this.mapGiphyItem(item)),
          };
        }),
        catchError(() => EMPTY)
      );
  }
}
