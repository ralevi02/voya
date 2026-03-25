export interface PaginationParams {
  page: number;
  limit: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export type Currency = string;

export interface CurrencyAmount {
  amount: number;
  currency: Currency;
}
