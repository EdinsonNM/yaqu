export interface ValidateError {
  validate(error: Error): Error | null;
}
