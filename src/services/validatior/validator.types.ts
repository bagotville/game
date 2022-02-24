export interface IValidationErrors {
  [key: string]: string;
}

export type TValidatorFn = (value: string) => IValidationErrors | null;
