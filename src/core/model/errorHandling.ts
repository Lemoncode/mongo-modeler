export interface errorHandling {
  errorKey?: string;
  errorMessage?: string;
  isSuccessful: boolean;
}

export interface Output<T> {
  errorHandling: errorHandling;
  data?: T;
}
