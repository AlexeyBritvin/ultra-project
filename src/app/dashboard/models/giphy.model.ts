export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Giphy extends Record<string, any> {
  id: string;
  source: string;
  title: string;
}

export interface GiphyResponse {
  data: Giphy[];
  pagination: GiphyPagination;
}
