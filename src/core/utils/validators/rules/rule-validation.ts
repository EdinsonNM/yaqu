import { Observable, forkJoin, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { ValidationRule } from "./validation-rule";

/**
 * RuleValidation Class
 *
 * The `RuleValidation` class is responsible for validating an object of type `T` using a set of rules.
 * Each rule is an object that implements the `ValidationRule<T>` interface.
 *
 * The `validate` method takes an object of type `T` and applies all validation rules in parallel.
 * If any of the rules fail, an error is thrown.
 *
 * Example of use:
 *
 * ```typescript
 * const rules: ValidationRule<MyObject>[] = [new MyFirstRule(), new MySecondRule()];
 * const validator = new RuleValidation(rules);
 *
 * const myObject = new MyObject();
 * validator.validate(myObject).subscribe({
 *   next: (validatedObject) => console.log('Validated object:', validatedObject),
 *   error: (error) => console.error('Validation error:', error)
 * });
 * ```
 *
 * @see ValidationRule
 */
export class RuleValidation<T> {
  /**
   * Constructor of the RuleValidation class
   *
   * @param rules An array of objects that implement the `ValidationRule<T>` interface.
   * These objects will be used to validate any object of type `T` given to the `validate` method.
   */
  constructor(private rules: ValidationRule<T>[]) {}

  /**
   * validate Method
   *
   * This method takes an object of type `T` and applies a series of validation rules on it.
   * The rules are provided by the objects that implement the `ValidationRule<T>` interface and that
   * were passed to the class constructor.
   *
   * @param objectToValidate The object you want to validate.
   * @returns Returns an Observable that emits the validated object or an error if any rule fails.
   */
  validate = (objectToValidate: T): Observable<T> => {
    if (this.rules.length === 0) {
      return of(objectToValidate);
    }

    const validationObservables = this.rules.map((rule) =>
      rule
        .validate(objectToValidate)
        .pipe(catchError((error) => throwError(() => error)))
    );

    return forkJoin(validationObservables).pipe(
      map(() => objectToValidate),
      catchError((error) => throwError(() => error))
    );
  };
}
