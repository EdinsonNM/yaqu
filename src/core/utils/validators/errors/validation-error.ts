import { ValidateError } from './validate-error';

/**
 * ValidationError Class
 *
 * The `ValidationError` class takes care of handling and checking errors in an application.
 * It uses a set of objects that follow the `ValidateError` interface to check errors in a flexible and modular way.
 *
 * Each object that follows `ValidateError` must have a `validate` method that takes an error object
 * and returns a new error object or the same object if no error condition is met.
 *
 * Example of use:
 *
 * ```typescript
 * const errorValidators: ValidateError[] = [new MyCustomError(), new AnotherCustomError()];
 * const validator = new ValidationError(errorValidators);
 *
 * const myError = new Error('Something went wrong');
 * const validatedError = validator.validate(myError);
 * ```
 *
 * @see ValidateError
 */
export class ValidationError {
  /**
   * Constructor of the ValidationError class
   *
   * @param errors An array of objects that follow the `ValidateError` interface.
   * These objects will be used to check any error object given to the `validate` method.
   */
  constructor(private errors: ValidateError[]) {}

  /**
   * validate Method
   *
   * This method takes an error object and applies a series of checks on it.
   * The checks are given by the objects that follow the `ValidateError` interface and that
   * were passed to the class constructor.
   *
   * @param errorObj The error object that you want to check.
   * @returns Returns an error object. If any of the checkers find an error, that error is returned.
   * Otherwise, the original error object is returned.
   */
  validate = (errorObj: Error): Error => {
    // Apply each checker to the error object
    const results = this.errors.map((err) => err.validate(errorObj));

    // Filter the results to get only the error objects
    const errors: Error[] = results.filter((result) => result instanceof Error) as Error[];

    // If at least one error is found, return the first error found
    if (errors.length > 0) {
      return errors[0];
    }

    // If no errors are found, return the original error object
    return errorObj;
  };
}
