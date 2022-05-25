import { AbstractControl } from '@angular/forms';

export type GenericEntity<T> = {
  [id: string]: T;
};

/**
 * Used in 'example-filter-table' - just to reduce
 */
export type FormControlConfig = { [p: string]: AbstractControl };
