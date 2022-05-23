import { InjectionToken } from '@angular/core';
import { environment } from '@environment/environment';

export interface IEnvironment {
  production: boolean;
  giphyApiKey: string;
  giphyApiUrl: string;
}

export const Environment = new InjectionToken<IEnvironment>('environment', {
  providedIn: 'root',
  factory: () => environment,
});
