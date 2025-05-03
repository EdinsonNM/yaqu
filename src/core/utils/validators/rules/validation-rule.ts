import { Observable } from 'rxjs';

export interface ValidationRule<T> {
  validate(person: T): Observable<T>;
}
