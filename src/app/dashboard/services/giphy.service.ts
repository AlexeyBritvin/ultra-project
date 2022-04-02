import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Giphy, GiphyResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private readonly url = 'https://api.giphy.com/v1/gifs';
  private params = {
    api_key: environment.giphyApiKey,
    limit: 9,
  };

  constructor(private http: HttpClient) {}

  getTrending(): Observable<Giphy[]> {
    return this.http
      .get<GiphyResponse>(`${this.url}/trending`, { params: this.params })
      .pipe(
        map((response) => response.data),
        map((data) =>
          data.map(({ id, images, title }) => ({
            id,
            source: images.original.mp4,
            title,
          }))
        )
      );
  }

  searchGifs(query: string): Observable<Giphy[]> {
    return this.http
      .get<GiphyResponse>(`${this.url}/search`, {
        params: { ...this.params, q: query },
      })
      .pipe(
        map((response) => response.data),
        map((data) =>
          data.map(({ id, images, title }) => ({
            id,
            source: images.original.mp4,
            title,
          }))
        )
      );
  }
}
